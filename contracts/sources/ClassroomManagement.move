module publisher::ClassroomManagement {

    use std::signer;
    use std::debug;

    struct Coins has store { val: u64 }

    struct Balance has key {
        coins: Coins
    }

    struct Badge has store { 
        name: vector<u8>,
        color: vector<u8>,
        role: vector<u8>
    }

    struct BadgeBalance has key {
        badges: vector<Badge>
    }

    struct EventTicket has store {
        event_name: vector<u8>,
        issued_to: vector<address>
    }

    struct Assignment has store {
        title: vector<u8>,
        due_date: u64,
        assigned_to: vector<address>,
        completed: vector<address>
    }

    const ERR_BALANCE_NOT_EXISTS: u64 = 101;
    const ERR_BADGE_NOT_EXISTS: u64 = 102;
    const ERR_BADGE_NAME_EXISTS: u64 = 103;
    const ERR_BADGE_COLOR_NOT_VALID: u64 = 104;
    const ERR_ROLE_NOT_VALID: u64 = 105;
    const EINSUFFICIENT_BALANCE: u64 = 1;

    const VALID_ROLES: vector<vector<u8>> = vector::new();
    const CHAIR_ROLE: vector<u8> = b"Chair";
    const TOPPER_ROLE: vector<u8> = b"Top Performer";

    public fun init_roles() {
        vector::push_back(&mut VALID_ROLES, CHAIR_ROLE);
        vector::push_back(&mut VALID_ROLES, TOPPER_ROLE);
    }

    public entry fun mint(account: &signer, val: u64) acquires Balance {
        let account_addr = signer::address_of(account);
        let new_coins = Coins { val };
        create_balance_if_not_exists(account);
        deposit(account_addr, new_coins);
    }

    public entry fun burn(account: &signer, val: u64) acquires Balance {
        let account_addr = signer::address_of(account);
        let coins_to_burn = withdraw(account_addr, val);
        let Coins { val: _ } = coins_to_burn;
    }

    public entry fun transfer(from: &signer, to: address, amount: u64) acquires Balance {
        let from_addr = signer::address_of(from);
        let coins_to_transfer = withdraw(from_addr, amount);
        deposit(to, coins_to_transfer);
    }

    public entry fun create_balance_if_not_exists(account: &signer) {
        let acc_addr = signer::address_of(account);
        if (!balance_exists(acc_addr)) {
            let zero_coins = Coins { val: 0 };
            move_to(account, Balance { coins: zero_coins });
        }
    }

    public fun balance_exists(acc_addr: address): bool {
        exists<Balance>(acc_addr)
    }

    public fun balance(owner: address): u64 acquires Balance {
        borrow_global<Balance>(owner).coins.val
    }

    public fun deposit(acc_addr: address, coins: Coins) acquires Balance {
        assert!(balance_exists(acc_addr), ERR_BALANCE_NOT_EXISTS);
        let balance_ref = &mut borrow_global_mut<Balance>(acc_addr).coins.val;
        let Coins { val } = coins;
        *balance_ref = *balance_ref + val;
    }

    public fun withdraw(acc_addr: address, value: u64): Coins acquires Balance {
        assert!(balance_exists(acc_addr), ERR_BALANCE_NOT_EXISTS);
        let balance_ref = &mut borrow_global_mut<Balance>(acc_addr).coins.val;
        assert!(*balance_ref >= value, EINSUFFICIENT_BALANCE);
        *balance_ref = *balance_ref - value;
        Coins { val: value }
    }

    public entry fun check_balance(account: &signer) acquires Balance {
        let account_addr = signer::address_of(account);
        let current_balance = balance(account_addr);
        debug::print(&current_balance);
    }

    public entry fun mint_badge(account: &signer, name: vector<u8>, color: vector<u8>, role: vector<u8>) acquires BadgeBalance {
        assert!(is_valid_color(&color), ERR_BADGE_COLOR_NOT_VALID);
        assert!(is_valid_role(&role), ERR_ROLE_NOT_VALID);
        let acc_addr = signer::address_of(account);
        create_badge_balance_if_not_exists(account);
        let new_badge = Badge { name, color, role };
        deposit_badge(acc_addr, new_badge);
    }

    public entry fun transfer_badge(from: &signer, to: address, badge_name: vector<u8>) acquires BadgeBalance {
        let from_addr = signer::address_of(from);
        let badge = withdraw_badge(from_addr, badge_name);
        deposit_badge(to, badge);
    }

    public entry fun create_badge_balance_if_not_exists(account: &signer) {
        let acc_addr = signer::address_of(account);
        if (!badge_balance_exists(acc_addr)) {
            let empty_badges = vector::empty<Badge>();
            move_to(account, BadgeBalance { badges: empty_badges });
        }
    }

    public fun badge_balance_exists(acc_addr: address): bool {
        exists<BadgeBalance>(acc_addr)
    }

    public fun get_badges(account: address): vector<Badge> acquires BadgeBalance {
        borrow_global<BadgeBalance>(account).badges
    }

    public entry fun change_badge_color(account: &signer, badge_name: vector<u8>, new_color: vector<u8>) acquires BadgeBalance {
        assert!(is_valid_color(&new_color), ERR_BADGE_COLOR_NOT_VALID);
        let acc_addr = signer::address_of(account);
        let badge_ref = find_badge_by_name(&mut borrow_global_mut<BadgeBalance>(acc_addr).badges, badge_name);
        badge_ref.color = new_color;
    }

    public fun deposit_badge(acc_addr: address, badge: Badge) acquires BadgeBalance {
        assert!(badge_balance_exists(acc_addr), ERR_BALANCE_NOT_EXISTS);
        let badge_bal_ref = &mut borrow_global_mut<BadgeBalance>(acc_addr).badges;
        vector::push_back(badge_bal_ref, badge);
    }

    public fun withdraw_badge(acc_addr: address, badge_name: vector<u8>): Badge acquires BadgeBalance {
        let badge_bal_ref = &mut borrow_global_mut<BadgeBalance>(acc_addr).badges;
        let index = find_badge_index_by_name(badge_bal_ref, badge_name);
        vector::remove(badge_bal_ref, index)
    }

    public fun find_badge_by_name(badges: &mut vector<Badge>, name: vector<u8>): &mut Badge {
        let index = find_badge_index_by_name(badges, name);
        &mut vector::borrow_mut(badges, index)
    }

    public fun find_badge_index_by_name(badges: &vector<Badge>, name: vector<u8>): u64 {
        let len = vector::length(badges);
        let mut i = 0;
        while (i < len) {
            let Badge { name: badge_name, color: _, role: _ } = vector::borrow(badges, i);
            if (*badge_name == name) {
                return i;
            }
            i = i + 1;
        }
        abort(ERR_BADGE_NOT_EXISTS);
    }

    public fun is_valid_color(color: &vector<u8>): bool {
        vector::length(color) == 7 && vector::borrow(color, 0) == b'#'
    }

    public fun is_valid_role(role: &vector<u8>): bool {
        let len = vector::length(&VALID_ROLES);
        let mut i = 0;
        while (i < len) {
            if (*vector::borrow(&VALID_ROLES, i) == *role) {
                return true;
            }
            i = i + 1;
        }
        false
    }

    public entry fun award_tokens_for_answer(account: &signer, student: address, amount: u64) acquires Balance {
        let teacher_addr = signer::address_of(account);
        assert!(balance_exists(teacher_addr), ERR_BALANCE_NOT_EXISTS);
        transfer(account, student, amount);
    }

    public entry fun award_top_performer(account: &signer, student: address, amount: u64, badge_name: vector<u8>, color: vector<u8>) acquires Balance, BadgeBalance {
        assert!(is_valid_color(&color), ERR_BADGE_COLOR_NOT_VALID);
        let acc_addr = signer::address_of(account);
        mint_badge(account, badge_name, color, TOPPER_ROLE);
        award_tokens_for_answer(account, student, amount);
    }

    public entry fun check_badges(account: &signer) acquires BadgeBalance {
        let account_addr = signer::address_of(account);
        let badges = get_badges(account_addr);
        let len = vector::length(&badges);
        let mut i = 0;
        while (i < len) {
            let Badge { name, color, role } = vector::borrow(&badges, i);
            debug::print(&name);
            debug::print(&color);
            debug::print(&role);
            i = i + 1;
        }
    }

    public entry fun record_participation(account: &signer, student: address) acquires Balance {
        let acc_addr = signer::address_of(account);
        let participation_reward = 10;
        award_tokens_for_answer(account, student, participation_reward);
    }

    public entry fun quiz_answered(account: &signer, student: address, is_correct: bool) acquires Balance {
        if (is_correct) {
            let reward = 20;
            award_tokens_for_answer(account, student, reward);
        }
    }

    public entry fun issue_participation_badge(account: &signer, student: address, badge_name: vector<u8>, color: vector<u8>) acquires BadgeBalance {
        mint_badge(account, badge_name, color, b"Participation");
        let reward = 15;
        award_tokens_for_answer(account, student, reward);
    }

    public entry fun top_performer_of_quiz(account: &signer, student: address) acquires Balance, BadgeBalance {
        let reward = 30;
        award_top_performer(account, student, reward, b"Quiz Master", b"#FFD700");
    }

    public entry fun log_student_activity(account: &signer, student: address, activity: vector<u8>) {
        debug::print(&activity);
    }

    public entry fun issue_event_ticket(account: &signer, event_name: vector<u8>, student: address) acquires Balance {
        let acc_addr = signer::address_of(account);
        let ticket_reward = 5;
        let ticket = EventTicket { event_name, issued_to: vector::empty<address>() };
        vector::push_back(&mut ticket.issued_to, student);
        award_tokens_for_answer(account, student, ticket_reward);
    }

    public entry fun create_assignment(account: &signer, title: vector<u8>, due_date: u64, assigned_to: vector<address>) acquires Balance {
        let new_assignment = Assignment { title, due_date, assigned_to, completed: vector::empty<address>() };
        move_to(account, new_assignment);
    }

    public entry fun complete_assignment(account: &signer, student: address) acquires Balance {
        let acc_addr = signer::address_of(account);
        let assignment = borrow_global<Assignment>(acc_addr);
        assert!(vector::contains(&assignment.assigned_to, student), ERR_ROLE_NOT_VALID);
        vector::push_back(&mut assignment.completed, student);
        let completion_reward = 15;
        award_tokens_for_answer(account, student, completion_reward);
    }

    public entry fun special_class(account: &signer, students: vector<address>, class_topic: vector<u8>) acquires Balance {
        let reward = 25;
        for (student in students) {
            award_tokens_for_answer(account, student, reward);
            issue_event_ticket(account, class_topic, student);
        }
    }

    public entry fun log_assignment_activity(account: &signer, student: address, assignment_title: vector<u8>) {
        debug::print(&assignment_title);
    }
}
