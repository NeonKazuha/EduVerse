// Server-side
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

io.listen(3001);

// Array to store characters
const characters = [];
const sockettoroom = new Map();
// Function to generate random position
const generateRandomPosition = () => {
  return [Math.random() * 3, -0.9, Math.random() * 3];
};

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  // Automatically join a room upon connection
  sockettoroom.set(socket.id, "gameRoom");
  // //console.log("User joined: " + socket.id + "gameRoom");
  io.to("gameRoom").emit("NewUserJoined", socket.id);
  socket.join("gameRoom");
  io.to(socket.id).emit("joined Room", socket.id);
  socket.broadcast.emit("user-connected", socket.id);
  const messages = [];
  //console.log("sent it back to user");
  // //console.log("User joined: " + socket.id);
  // Add new character to the characters array and emit 'spawn' event to all clients
  const questionAnswers = {};
  const classes = [];
  const quests = [];
  const eventsList = []; // Store all events
  characters.push({
    id: socket.id,
    delta: [0, 0, 0],
    rotation: 0,
    avatar: 0,
    animation: "",
    accountAddress:"",
    url: "",
    doubt: false,
    position: generateRandomPosition(),
    assignments: [],
    materials: [],
    models: [],
    events: [],
    role: " ",
  });
  io.to("gameRoom").emit("spawn", characters);
  // socket.on("user:call", ({ to, offer }) => {
  //   //console.log({ to });

  //   io.to(to).emit("incomming:call", { from: socket.id, offer });
  // });
  // socket.on("call:accepted", ({ to, ans }) => {
  //   io.to(to).emit("call:accepted", { from: socket.id, ans });
  // });
  // Handle rotation event
  socket.on("rotation", (rotation) => {
    const character = characters.find(
      (character) => character.id === socket.id
    );
    if (character) {
      character.rotation = rotation;
      io.to("gameRoom").emit("spawn", characters);
    }
  });

  // Handle position event
  socket.on("position", (position) => {
    // console.log(characters);
    const character = characters.find(
      (character) => character.id === socket.id
    );
    if (character) {
      character.position = [position.x, position.y, position.z];
      io.to("gameRoom").emit("spawn", characters);
    }
  });

  // Handle delta event
  socket.on("delta", (delta) => {
    const character = characters.find(
      (character) => character.id === socket.id
    );
    if (character) {
      character.delta = [delta.x, delta.y, delta.z];
      io.to("gameRoom").emit("spawn", characters);
    }
  });
  socket.on("url", (url) => {
    characters.forEach((character) => {
      character.url = url;
    });

    io.to("gameRoom").emit("spawn", characters);
  });
  socket.on("animation", (animation) => {
    const character = characters.find(
      (character) => character.id === socket.id
    );
    if (character) {
      character.animation = animation.animation;
      io.to("gameRoom").emit("spawn", characters);
    }
  });
  socket.on("Doubt", (raise) => {
    //console.log("doube raised");
    const character = characters.find(
      (character) => character.id === socket.id
    );
    if (character) {
      character.doubt = raise;
      io.to("gameRoom").emit("spawn", characters);
    }
  });
  socket.on("role", (role) => {
    //console.log("doube raised");
    const character = characters.find(
      (character) => character.id === socket.id
    );
    if (character) {
      character.role = role;
      io.to("gameRoom").emit("spawn", characters);
    }
  });
  socket.on("resolve", (id) => {
    const character = characters.find((character) => character.id === id);
    if (character) {
      character.doubt = false;
      io.to("gameRoom").emit("spawn", characters);
    }
  });
  socket.on("assignment", (assign) => {
    //console.log(assign);
    characters.forEach((character) => {
      character.assignments.push({
        title: assign.title,
        description: assign.description,
        dueDate: assign.dueDate,
        status: "pending",
        url: "",
      });
    });
    io.to("gameRoom").emit("spawn", characters);
  });
  socket.on("material", (mat) => {
    characters.forEach((character) => {
      character.materials.push({
        title: mat.title,
        link: mat.link,
      });
    });
    io.to("gameRoom").emit("spawn", characters);
  });
  socket.on("model", (mod) => {
    //console.log(mod.link);
    characters.forEach((character) => {
      character.models.push({
        title: mod.title,
        link: mod.link,
      });
    });
    io.to("gameRoom").emit("spawn", characters);
  });
  socket.on("assignmentdone", (ass) => {
    //console.log(ass.link, ass.title);
    const character = characters.find(
      (character) => character.id === socket.id
    );
    if (character) {
      // Find the assignment with the specified title in the character's assignments array
      const foundAssignment = character.assignments.find(
        (assignment) => assignment.title === ass.title
      );
      if (foundAssignment) {
        // Update assignment status or properties as needed
        foundAssignment.status = "done";
        foundAssignment.url = ass.link;

        // Emit updated character state to the 'gameRoom'
        io.to("gameRoom").emit("spawn", characters);
      }
    }
  });
  // attendance
  socket.on("takeAttendance", () => {
    //console.log("Taking attendance");

    io.to("gameRoom").emit("attendanceRequest", socket.id);
  });

  socket.on("attendanceResponse", (response) => {
    const character = characters.find(
      (character) => character.id === socket.id
    );

    if (character) {
      character.present = response.present;

      io.to("gameRoom").emit("attendanceUpdate", characters);
    }
  });
  // Handle askQuestion event

  socket.on("askQuestion", (data) => {
    const questionId = Date.now(); // Unique ID for the question

    questionAnswers[questionId] = { question: data.question, answerArray: [] };

    io.to("gameRoom").emit("receiveQuestion", { ...data, id: questionId });
  });

  socket.on("submitAnswer", (data) => {
    const { questionId, answer } = data;

    if (questionAnswers[questionId]) {
      questionAnswers[questionId].answerArray.push({
        studentId: socket.id,
        answer,
      });

      // Send updated answers to the teacher

      io.to("gameRoom").emit("updateAnswers", questionAnswers[questionId]);
    }
  });
  socket.on("gradeAssignment", ({ studentId, assignmentTitle, grade }) => {
    const character = characters.find(
      (character) => character.id === studentId
    );

    if (character) {
      const assignment = character.assignments.find(
        (a) => a.title === assignmentTitle
      );

      if (assignment) {
        assignment.grade = grade;

        io.to("gameRoom").emit("spawn", characters); // Emit updated characters
      }
    }
  });
  // When a new event is scheduled
  socket.on("scheduleEvent", (eventData) => {
    // console.log("crreate evelkllllllllllllllllllllllll")
    const { name, time, characterId } = eventData;
    const newEvent = { name, time, attendees: [] }; // New event object
    eventsList.push(newEvent); // Add event to the global list
    console.log(eventsList);
    // Emit the updated eventsList to all clients
    io.to("gameRoom").emit("updateEvents", eventsList);
  });

  // When a character joins an event
  socket.on("joinEvent", (data) => {
    const { characterId, event } = data;

    const character = characters.find((char) => char.id === characterId);
    if (character) {
      character.events.push(event); // Add event to character's events array
      console.log(character);
      // Emit updated character list
      io.to("gameRoom").emit("spawn", characters);
    }
  });
  // socket.on("createQuest", (questData) => {
  //   // Add the new quest to the quests array
  //   quests.push(questData);
  //   // Emit the updated quests array to all users in the room
  //   io.to("gameRoom").emit("updateQuests", quests);

  //   // Emit a notification about the new quest
  //   io.to("gameRoom").emit("questCreated", {
  //     message: `A new quest "${questData.name}" has been created!`,
  //     creator: questData.creator.username,
  //   });
  // });
  socket.on("createQuest", (questData) => {
    const newQuest = {
      ...questData,
      status: "open",
      pendingApprovals: [],
      participants: [],
    };
    quests.push(newQuest);

    console.log(quests)
    io.to("gameRoom").emit("updateQuests", quests);
    io.to("gameRoom").emit("questCreated", {
      message: `A new quest "${newQuest.name}" has been created!`,
      creator: newQuest.creator.username,
    });
  });
  socket.on("acceptQuest", ({ questId, userId, username }) => {
    console.log(questId, userId);
    console.log(quests)
    const quest = quests.find((q) => q.questId === questId);
    console.log("quest qccpted")
    console.log(quest);
    if (quest && quest.status === "open") {
      quest.pendingApprovals.push({ userId, username });
      io.to(quest.creator.userId).emit("questParticipantRequest", {
        questId,
        questName: quest.name,
        userId,
        username,
      });
      io.to("gameRoom").emit("updateQuests", quests);
    }
  });

  socket.on("approveParticipant", ({ questId, userId }) => {
    const quest = quests.find((q) => q.questId === questId);
    if (quest) {
      const approvedParticipant = quest.pendingApprovals.find(
        (p) => p.userId === userId
      );
      if (approvedParticipant) {
        quest.pendingApprovals = quest.pendingApprovals.filter(
          (p) => p.userId !== userId
        );
        quest.participants.push(approvedParticipant);
        io.to(userId).emit("questParticipationApproved", {
          questId,
          questName: quest.name,
        });
        io.to("gameRoom").emit("updateQuests", quests);
      }
    }
  });
//iska trans abhi nahi 
  socket.on("rejectParticipant", ({ questId, userId }) => {
    const quest = quests.find((q) => q.questId === questId);
    if (quest) {
      quest.pendingApprovals = quest.pendingApprovals.filter(
        (p) => p.userId !== userId
      );
      io.to(userId).emit("questParticipationRejected", {
        questId,
        questName: quest.name,

      });
      io.to("gameRoom").emit("updateQuests", quests);
    }
  });

  // socket.on("createClass", (newClass) => {
  //   console.log("New class created:", newClass);

  //   classes.push(newClass);

  //   io.emit("updateClasses", classes); // Broadcast updated classes to all clients
  // });

  // // New event handler for joining a class

  // socket.on("joinClass", ({ studentId, class: updatedClass }) => {
  //   console.log(`Student ${studentId} joined class:`, updatedClass);

  //   const classIndex = classes.findIndex((c) => c.name === updatedClass.name);

  //   if (classIndex !== -1) {
  //     classes[classIndex] = updatedClass;

  //     io.emit("updateClasses", classes); // Broadcast updated classes to all clients
  //   }
  // });

  socket.on("createClass", (newClass) => {
    console.log("new Class Created", newClass);
    classes.push(newClass);

    io.to("gameRoom").emit("updateClasses", classes);
  });
  socket.emit("chat history", messages);

  // Add this new event listener for chat messages

  socket.on("chat message", (message) => {
    console.log("Received chat message:", message);

    // Add the new message to the array with sender information

    const newMessage = {
      text: message,

      sender: socket.id, // Using socket.id as a temporary identifier

      timestamp: new Date().toISOString(),
    };

    messages.push(newMessage);

    // Broadcast the updated message array to all clients in the room

    io.to("gameRoom").emit("chat history", messages);
  });

  // Listen for joining a class
  socket.on("setAccountAddress", (address) => {
    const character = characters.find((c) => c.id === socket.id);

    if (character) {
      character.accountAddress = address;
console.log(character.accountAddress)
console.log(characters)
      // Notify all clients about the updated character

      io.to("gameRoom").emit("characterUpdated", character);
    }
  });
  socket.on("joinClass", ({ characterId, class: updatedClass }) => {
    const classIndex = classes.findIndex((c) => c.name === updatedClass.name);

    if (classIndex !== -1) {
      classes[classIndex] = updatedClass;

      io.to("gameRoom").emit("updateClasses", classes);
    }
  });
  
  // Handle disconnection
  socket.on("disconnect", () => {
    //console.log("User disconnected: " + socket.id);
    const index = characters.findIndex(
      (character) => character.id === socket.id
    );
    if (index !== -1) {
      characters.splice(index, 1);
      io.to("gameRoom").emit("spawn", characters);
    }
  });
});
