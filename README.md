# EduVerse

## Introduction

Welcome to **EduVerse**, an innovative 3D Metaverse platform that redefines virtual learning and education. This platform offers immersive classrooms where students can engage with course materials, complete assignments, and participate in interactive quests, all within a virtual environment. By leveraging **Aptos blockchain technology** and the **Move programming language**, Meta-Edu-Aptos rewards students with tokens and mints NFTs based on their achievements, thereby creating a dynamic learning experience.

Our goal is to break down geographical barriers and provide accessible, engaging, and interactive educational experiences for students worldwide. With features that support real-time collaboration, immersive learning environments, and blockchain-driven rewards, this platform is designed for the future of education.
In Meta-Edu-Aptos, learning goes beyond traditional methods—it's engaging, fun, and rewarding. By completing interactive quests, students can climb up the leaderboard, earn XP points, and unlock exclusive rewards. The more you achieve, the more you advance!

With blockchain-powered tokens earned through your accomplishments, you can purchase in-game assets, customize your virtual experience, and enhance your learning environment. Meta-Edu-Aptos combines education and entertainment, making learning exciting as you progress through quests, gain recognition, and compete with peers. Education has never been this fun or rewarding!

## Table of Contents

- [Tech Stack](#tech-stack)
- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [How to Run the Project](#how-to-run-the-project)
- [Contract Information](#contract-information)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## Tech Stack

Meta-Edu-Aptos utilizes a diverse array of technologies to create seamless and engaging user experiences:

- **Three.js**: A lightweight 3D library that enables rendering of immersive 3D graphics in web browsers, making our classrooms visually appealing.
- **React**: A powerful JavaScript library for building user interfaces, facilitating the development of interactive and dynamic components.
- **LlamaIndex**: A natural language processing framework used for building conversational agents that assist users in real time.
- **Python**: Employed for backend services and machine learning tasks, ensuring high-performance operations.
- **GSAP (GreenSock Animation Platform)**: A robust animation library for creating smooth animations and transitions throughout the platform.
- **R3F (React Three Fiber)**: A React renderer for Three.js that enhances integration and performance of 3D scenes.
- **Jotai**: A state management library for managing application state in React applications, simplifying data flow and component interactions.
- **Move**: A smart contract language specifically designed for the Aptos blockchain, enabling secure and efficient contract execution.
- **Aptos**: The blockchain platform where we deploy our smart contracts and manage transactions securely.
- **Petra**: A wallet solution for managing transactions on the Aptos network, providing users with a secure way to handle their tokens.
- **Socket.io**: A library that facilitates real-time communication between clients and servers, essential for interactive classroom environments.
- **WebXR**: An API for creating immersive virtual reality (VR) and augmented reality (AR) experiences directly in web browsers.
- **MongoDB**: A NoSQL database used to store user data, course materials, and application metadata.
- **WebRTC**: A technology enabling peer-to-peer connections for real-time audio and video communication in virtual classrooms.
- **Peer.js**: A library that simplifies WebRTC connections for easier implementation of peer-to-peer features.
- **pyttsx3**: A text-to-speech library in Python, allowing voice-based interactions and accessibility features for users.

## About the Project

Meta-Edu-Aptos provides a wide range of functionalities tailored to enhance the educational experience. The platform combines the latest in technology and educational strategies to create an engaging learning environment that promotes collaboration, creativity, and accessibility.

### Key Features

- **3D Virtual Classroom**: Engage with interactive 3D models, attend live lessons, and collaborate with peers and educators in real time. The classroom environment simulates a physical classroom setting, providing students with a sense of presence and community.

- **Quests and Assignments**: Students can complete various educational quests and assignments. Each completed task rewards them with Aptos-based tokens, fostering motivation and engagement in their learning journey.

- **NFT Minting**: Based on their achievements, students can mint NFTs that represent their milestones and accomplishments. This feature encourages a sense of ownership and pride in their educational achievements.(future feature)

- **Token Rewards System**: The platform has an integrated rewards system where students earn tokens for their academic efforts. These tokens can be utilized in the virtual shop for educational resources or fun items.

- **Virtual Shop**: A marketplace where students can spend their earned tokens. Items available for purchase include virtual tools, educational resources, and even fun items like virtual snacks.

- **Multilingual Support**: To cater to a global audience, the platform supports multiple languages, ensuring that students from various backgrounds can access educational content in their preferred language.

- **Real-time Collaboration**: The use of WebRTC and Socket.io allows for seamless interaction between students and teachers. Video conferencing, group discussions, and real-time Q&A sessions create a collaborative learning environment.

- **Enhanced Learning Materials**: Educators can upload PDF presentations, 3D models, and other multimedia resources to enhance the learning experience. Interactive elements help students retain information more effectively.

- **Badges and Leaderboards**: Students can earn badges for their achievements and climb leaderboards, promoting healthy competition and motivation among peers.

- **Unlock New Characters**: As students progress, they can unlock new 3D characters that represent them in the virtual environment, enhancing personal connection and engagement.

- **Interaction with Others**: Students can interact with their peers in the form of 3D characters, fostering a sense of community and collaboration within the platform.


## Images

![image1](./images/image1.jpeg)

![image1](./images/image2.jpeg)

![image1](./images/Meeting2.png)

![image1](./images/Meeting4.png)

![image1](./images/AR.png)

![image1](./images/VR.png)

![image1](./images/ImageConfrence1.png)

![image1](./images/image3.jpeg)

![image1](./images/image4.jpeg)

![image1](./images/image5.jpeg)

![image1](./images/ImageTheater1.png)


## How to Run the Project

### Prerequisites

Before running the project, ensure you have the following installed:

- Node.js
- Python 3.x
- MongoDB
- Aptos CLI for deploying contracts
- Petra wallet set up for transactions

### Steps to Run the Project Locally:

1. **Clone the Repository:**
    bash
    git clone (https://github.com/NeonKazuha/EduVerse)
    cd EduVerse
    

2. **Install Dependencies:**
    bash
    npm install
    pip install -r requirements.txt
    

3. **Run the Server:**
   - For the backend:
    bash
    nodemon index.js
    
   - For the Python app:
    bash
    python main.py
    

4. **Start the MongoDB Server**: Ensure your MongoDB server is running locally.

5. **Run the Aptos CLI Commands**: Use the Aptos CLI to deploy contracts as needed.

6. **Open the Application**: Navigate to `http://localhost:3000` in your web browser to access the application.

### Contract Information

All token and NFT-related functionalities are deployed on the Aptos testnet. The contract address for transactions is:

**Petra Wallet Address**:

`0x2a2f75fadf5ab3bbbe9baffc87f0f6be11aece54350ac85abb68ade94404dc89`

## Contributions

We welcome contributions from developers, designers, and educators to enhance the functionality and user experience of Meta-Edu-Aptos. Please refer to our Contributing Guidelines for more details on how to get involved.

## License

EduVerse is licensed under the MIT License. See the LICENSE file for details.

- The Aptos community for their robust blockchain infrastructure.
- The open-source contributors whose libraries and tools made this project possible.
- Our educators and students who provide valuable feedback and insights to improve the platform.


