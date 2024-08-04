import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const content = [
  {
    name: 'Charles Milton',
    title: "UC Berkeley's AI Hackathon",
    text: "<p>I participated in UC Berkeley's AI Hackathon, where I had the opportunity to collaborate with like-minded individuals and dive deep into innovative AI solutions. The event was a challenging yet rewarding experience, pushing me to expand my skills in machine learning, data science, and AI application development. Working under tight deadlines, my team and I brainstormed, developed, and presented a project that tackled real-world problems using cutting-edge AI techniques. The hackathon provided a platform to network with industry professionals, gain insights from expert-led workshops, and receive valuable feedback on our project. It was a stimulating environment that fostered creativity, teamwork, and a passion for AI.</p>",
    subject: 'events',
    password: 'password',
    id: 614099,
    image: '/uploads/1722728645633-535236500-background.jpeg',
    date: '08/01/2024'
  },
  {
    name: 'Alex Thompson',
    title: 'How AI is Personalizing Education',
    text: "<p>Artificial intelligence is transforming education by providing personalized learning experiences. AI-driven platforms analyze students' performance and learning styles to tailor educational content accordingly. This approach not only enhances learning outcomes but also keeps students engaged and motivated. Discover how AI is reshaping the future of education and making learning more effective and accessible for everyone.</p>",
    subject: 'mlai',
    password: 'password',
    id: 873310,
    image: '/uploads/1722728836423-129475604-aieducation.webp',
    date: '08/02/2024'
  },
  {
    name: 'Priya Patel',
    title: 'The Immersive Future: Exploring VR and AR Technologies',
    text: '<p>As our world becomes increasingly digital, the importance of robust cyber security measures cannot be overstated. Cyber threats are evolving, targeting individuals, businesses, and governments alike. From data breaches to ransomware attacks, the landscape of cyber security is complex and ever-changing. Learn about the latest trends in cyber security, effective strategies to protect your digital assets, and the role of emerging technologies in safeguarding against cyber threats.</p>',
    subject: 'vrar',
    password: 'password',
    id: 423182,
    image: '/uploads/1722729183734-107963286-vrimage.avif',
    date: '08/03/2024'
  },
  {
    name: 'Michael Chen',
    title: 'Maximizing Your Internship Experience in Tech',
    text: "<p>Internships are a crucial step in building a successful career in the tech industry. They provide hands-on experience, industry knowledge, and valuable networking opportunities. Whether you're interested in software development, data science, or cyber security, securing a tech internship can propel your career forward. Explore tips on finding the right internship, making the most of your experience, and leveraging your internship to achieve your career goals.</p>",
    subject: 'careers',
    password: 'password',
    id: 315377,
    image: '/uploads/1722729503059-578894460-internshipimage.png',
    date: '08/03/2024'
  },
  {
    name: 'Emily Rodriguez',
    title: 'Strengthening Cyber Security in the Digital Age',
    text: '<p>Artificial Intelligence (AI) research is at the forefront of technological innovation. From natural language processing to machine learning algorithms, researchers are constantly pushing the boundaries of what AI can achieve. This research not only advances our understanding of AI but also leads to practical applications that improve our daily lives. Delve into the latest breakthroughs in AI research and discover how these developments are shaping the future of technology.</p>',
    subject: 'cybersec',
    password: 'password',
    id: 157917,
    image: '/uploads/1722729647413-886951285-cybersecimage.jpeg',
    date: '08/04/2024'
  },
  {
    name: 'Sarah Williams',
    title: 'Demystifying Quantum Computing: Common Questions Answered',
    text: '<p>Quantum computing is one of the most intriguing advancements in technology, yet it remains a mystery to many. Here, we answer some common questions about quantum computing, explaining how it differs from classical computing, its potential applications, and the challenges it faces.</p>\r\n' +
      '<p><strong>What is Quantum Computing?</strong> Quantum computing uses the principles of quantum mechanics to perform calculations. Unlike classical computers, which use bits as the smallest unit of data, quantum computers use quantum bits or qubits. Qubits can represent both 0 and 1 simultaneously, thanks to a property called superposition, enabling quantum computers to process a vast amount of data simultaneously.</p>\r\n' +
      '<p><strong>How Does Quantum Computing Work?</strong> Quantum computers leverage phenomena such as superposition, entanglement, and interference to perform calculations. Superposition allows qubits to exist in multiple states at once, entanglement links qubits so that the state of one can depend on the state of another, and interference is used to control qubit states and combine different computational paths.</p>\r\n' +
      '<p><strong>What Are the Applications of Quantum Computing?</strong> Quantum computing has potential applications in various fields, including cryptography, drug discovery, optimization problems, and financial modeling. It can solve complex problems much faster than classical computers, making it a valuable tool for industries requiring intensive computation.</p>\r\n' +
      '<p><strong>What Are the Challenges of Quantum Computing?</strong> Building and maintaining quantum computers is challenging due to their sensitivity to environmental disturbances, which can cause errors in calculations. Researchers are working on developing error-correcting codes and stable qubit systems to overcome these challenges. Additionally, quantum algorithms and software need further development to harness the full potential of quantum computing.</p>\r\n' +
      '<p>Quantum computing holds immense promise, and while it is still in the early stages of development, ongoing research and advancements are paving the way for its broader application and impact on various industries.</p>',
    subject: 'faq',
    password: 'password',
    id: 152363,
    image: '/uploads/1722730136381-533846797-quantumimage.jpg',
    date: '08/03/2024'
  },
  {
    name: 'Jason Liu',
    title: 'Top Internship Opportunities in Tech for 2024',
    text: '<p>With the tech industry booming, there are more opportunities than ever for students and recent graduates to gain valuable experience. Here are some of the top internship opportunities in tech for 2024, including positions in software development, data science, cyber security, and AI.</p>\r\n' +
      "<p><strong>1. Google Software Engineering Internship</strong> Google offers a renowned software engineering internship where interns work on real projects alongside experienced engineers. This program provides opportunities to learn about large-scale software systems, develop coding skills, and gain insight into Google's innovative culture. Applications open in September 2023.</p>\r\n" +
      "<p><strong>2. Microsoft Data Science Internship</strong> Microsoft's data science internship program is perfect for students interested in machine learning and data analytics. Interns work on cutting-edge projects, from predictive modeling to data visualization, and gain hands-on experience with Microsoft's tools and technologies. Application deadlines vary, so check their careers site for details.</p>\r\n" +
      '<p><strong>3. Cyber Security Internship at IBM</strong> IBM offers a comprehensive cyber security internship program where interns engage in threat analysis, vulnerability assessment, and security strategy development. This program is ideal for students looking to specialize in cyber security and gain practical experience in a corporate environment. Applications typically open in October 2023.</p>\r\n' +
      "<p><strong>4. Amazon AI Research Internship</strong> Amazon's AI research internship is designed for students pursuing advanced degrees in AI and machine learning. Interns collaborate with Amazon's AI scientists to develop new algorithms, conduct experiments, and publish research findings. The application process begins in December 2023.</p>\r\n" +
      "<p><strong>5. Facebook Product Management Internship</strong> Facebook's product management internship provides a unique opportunity to learn about product development, user experience design, and market analysis. Interns work closely with product teams to create innovative solutions and improve Facebook's suite of products. Applications open in January 2024.</p>\r\n" +
      '<p>These internships offer valuable experiences, networking opportunities, and the chance to work on innovative projects. To apply, visit the respective company&rsquo;s careers page, prepare a strong application, and stay updated on deadlines. Best of luck in your search for an exciting and rewarding internship!</p>',
    subject: 'careers',
    password: 'password',
    id: 401110,
    image: '/uploads/1722730345185-526241465-internshipimage.jpg',
    date: '08/03/2024'
  },
  {
    name: 'Jennifer Lee',
    title: 'Understanding Blockchain: Frequently Asked Questions',
    text: '<p>Blockchain technology has gained significant attention in recent years, but many people still have questions about what it is and how it works. In this post, we answer some of the most frequently asked questions about blockchain.</p>\r\n' +
      '<p><strong>What is Blockchain?</strong> Blockchain is a decentralized digital ledger that records transactions across multiple computers. This ensures that the recorded transactions cannot be altered retroactively, providing transparency and security.</p>\r\n' +
      '<p><strong>How Does Blockchain Work?</strong> Each block in a blockchain contains a list of transactions. When a new transaction occurs, it is added to a block, which is then verified by a network of computers (nodes). Once verified, the block is added to the chain in a linear, chronological order.</p>\r\n' +
      '<p><strong>What Are the Applications of Blockchain?</strong> Blockchain technology can be used in various industries, including finance, supply chain management, healthcare, and voting systems. It provides a secure and transparent way to record transactions and track assets.</p>\r\n' +
      '<p><strong>What Are the Benefits of Blockchain?</strong> The main benefits of blockchain include enhanced security, transparency, and efficiency. Because it is decentralized, it is less vulnerable to hacking. The transparency of the blockchain allows for easy auditing and verification of transactions.</p>',
    subject: 'faq',
    password: 'password',
    id: 707009,
    image: '/uploads/1722730475111-371928357-blockchain.jpg',
    date: '08/03/2024'
  },
  {
    name: 'Laura Fernandez',
    title: 'Exciting Research Opportunities in Quantum Computing',
    text: '<p>Quantum computing research is opening new frontiers in technology. Here are some of the most exciting research opportunities currently available in the field.</p>\r\n' +
      '<p><strong>Quantum Algorithm Development</strong> Researchers are working on developing new quantum algorithms that can solve problems faster than classical algorithms. This research is crucial for unlocking the full potential of quantum computers.</p>\r\n' +
      '<p><strong>Quantum Cryptography</strong> Quantum cryptography research focuses on creating secure communication systems that leverage quantum mechanics principles. This could revolutionize the field of cybersecurity.</p>\r\n' +
      '<p><strong>Quantum Hardware</strong> Developing stable and scalable quantum hardware is a significant research area. Researchers are exploring various approaches to building qubits, the fundamental units of quantum computers, with improved stability and error rates.</p>\r\n' +
      '<p><strong>Quantum Machine Learning</strong> Integrating quantum computing with machine learning is a burgeoning research area. This involves developing quantum algorithms that can improve the performance of machine learning models.</p>',
    subject: 'research',
    password: 'password',
    id: 232742,
    image: '/uploads/1722730565217-877491126-quantumresearch.jpeg',
    date: '08/03/2024'
  },
  {
    name: 'Emily Nguyen',
    title: 'The Future of Software Engineering: Trends to Watch',
    text: '<p>Software engineering is a constantly evolving field. Here are some trends that will shape the future of software engineering.</p>\r\n' +
      '<p><strong>Low-Code and No-Code Development</strong> Low-code and no-code platforms enable developers to build applications with minimal coding. These platforms increase development speed and make software creation more accessible to non-developers.</p>\r\n' +
      '<p><strong>DevSecOps</strong> Integrating security into the DevOps process (DevSecOps) ensures that security is considered throughout the software development lifecycle. This approach helps in identifying and mitigating security issues early.</p>\r\n' +
      '<p><strong>AI and Automation</strong> AI and automation are transforming software engineering by automating repetitive tasks, improving code quality, and enhancing testing processes. These technologies enable developers to focus on more complex and creative aspects of software development.</p>\r\n' +
      '<p><strong>Microservices Architecture</strong> Microservices architecture is becoming increasingly popular for building scalable and resilient applications. This approach breaks down applications into smaller, independent services that can be developed, deployed, and scaled independently.</p>',
    subject: 'swe',
    password: 'password',
    id: 496523,
    image: '/uploads/1722730635388-481717914-sweimage.jpg',
    date: '08/03/2024'
  },
  {
    name: 'Chris Johnson',
    title: 'Top Tech Conferences to Attend in 2024',
    text: '<p>Tech conferences provide valuable opportunities for networking, learning, and staying up-to-date with the latest industry trends. Here are some of the top tech conferences to attend in 2024.</p>\r\n' +
      '<p><strong>CES 2024</strong> Location: Las Vegas, NV Dates: January 9-12, 2024 CES is one of the largest tech conferences in the world, showcasing the latest innovations in consumer electronics, AI, and more.</p>\r\n' +
      "<p><strong>SXSW Interactive</strong> Location: Austin, TX Dates: March 8-16, 2024 SXSW Interactive focuses on emerging technology, creative industries, and forward-thinking ideas. It's a hub for networking and discovering new trends.</p>\r\n" +
      '<p><strong>Google I/O</strong> Location: Mountain View, CA Dates: May 14-16, 2024 Google I/O is an annual developer conference where Google announces its latest products and innovations. It includes keynotes, technical sessions, and hands-on labs.</p>\r\n' +
      '<p><strong>AWS re</strong></p>\r\n' +
      '<div>&nbsp;</div>\r\n' +
      '<p>Location: Las Vegas, NV Dates: November 25-29, 2024 AWS re</p>\r\n' +
      '<div>&nbsp;</div>\r\n' +
      '<p>is a major event for cloud computing enthusiasts. It features keynotes, training sessions, and opportunities to connect with AWS experts and partners.</p>\r\n' +
      '<p>&nbsp;</p>\r\n' +
      "<p><strong>DEF CON</strong> Location: Las Vegas, NV Dates: August 8-11, 2024 DEF CON is one of the world's largest and most notable hacker conventions. It covers a wide range of topics related to cybersecurity and hacking.</p>\r\n" +
      "<p>These events offer a wealth of knowledge, inspiration, and networking opportunities. Whether you're a developer, entrepreneur, or tech enthusiast, attending these conferences can provide valuable insights and connections.</p>",
    subject: 'events',
    password: 'password',
    id: 269537,
    image: '/uploads/1722730753709-455992850-techconference.jpg',
    date: '08/03/2024'
  },
  {
    name: 'Jennifer Lee',
    title: "Understanding the Rise of CSULB's Engineering Programs",
    text: '<p><strong>Introduction</strong></p>\r\n' +
      '<p>Cal State Long Beach (CSULB) has recently achieved significant recognition in the 2024 U.S. News and World Report rankings, particularly in its engineering programs. This article delves into the specifics of these achievements and what they mean for current and prospective students.</p>\r\n' +
      '<p><strong>High Rankings in Engineering</strong></p>\r\n' +
      "<p>The College of Engineering at CSULB secured its highest rankings ever, placing 20th in undergraduate engineering, 8th in civil engineering, 10th in computer engineering, and 12th in electrical engineering among schools without a PhD program. These impressive rankings reflect the college's commitment to excellence in education, research, and innovation.</p>\r\n" +
      "<p><strong>Dean's Perspective</strong></p>\r\n" +
      '<p>&ldquo;While the USNWR rankings are not perfect, I am pleased to see the good work of our faculty and students being recognized by the engineering leadership in the country,&rdquo; said Dean Jinny Rhee. &ldquo;As far as I am aware, the College of Engineering has not placed in the top-20 before, and it is deserving of celebration.&rdquo;</p>\r\n' +
      '<p><strong>Focus on Hands-On Learning</strong></p>\r\n' +
      "<p>CSULB's engineering programs emphasize hands-on learning, ensuring that students are well-prepared for real-world challenges. The computer engineering department, for instance, is renowned for its focus on practical skills, enabling students to design their own career paths.</p>\r\n" +
      '<p><strong>Conclusion</strong></p>\r\n' +
      "<p>These high rankings and the college's continuous efforts in fostering innovation and practical skills make CSULB a top choice for aspiring engineers. The university&rsquo;s achievements in engineering are a testament to its dedication to providing high-quality education and producing well-rounded graduates ready to tackle modern challenges.</p>",
    subject: 'faq',
    password: 'password',
    id: 389225,
    image: '/uploads/1722732770659-810801853-csulbtechfaq.jpg',
    date: '08/03/2024'
  },
  {
    name: 'Daniel Kim',
    title: 'Opportunities at the 2024 Engineering & Technology Career Fair',
    text: '<p><strong>Introduction</strong></p>\r\n' +
      '<p>The 2024 Engineering &amp; Technology Career Fair at CSULB is a pivotal event for students seeking career opportunities in engineering and technology. This article provides an overview of what to expect, how to prepare, and the benefits of attending.</p>\r\n' +
      '<p><strong>Event Overview</strong></p>\r\n' +
      '<p>Scheduled for September 21st, 2024, from 12 PM to 4 PM in the USU Ballrooms, the career fair is designed to connect students with potential employers offering full-time, part-time, and internship positions. The event attracts a wide range of companies, from startups to established industry leaders.</p>\r\n' +
      '<p><strong>Preparing for the Fair</strong></p>\r\n' +
      '<p>Students are encouraged to bring multiple copies of their resumes, dress professionally, and research participating companies beforehand. The Career Development Center offers workshops on resume writing and interview techniques leading up to the fair.</p>\r\n' +
      '<p><strong>Networking Opportunities</strong></p>\r\n' +
      '<p>The fair provides a unique platform for students to network with industry professionals, learn about various companies, and explore different career paths. It&rsquo;s an excellent opportunity to gain insights into what employers are looking for and to make valuable connections that can aid in job searches.</p>\r\n' +
      '<p><strong>Conclusion</strong></p>\r\n' +
      '<p>Attending the Engineering &amp; Technology Career Fair is an essential step for students looking to advance their careers in tech and engineering. It&rsquo;s an opportunity to showcase their skills, gain industry knowledge, and secure job or internship positions.</p>',
    subject: 'careers',
    password: 'password',
    id: 390289,
    image: '/uploads/1722732863284-254200072-csulbcareer.jpg',
    date: '08/03/2024'
  },
  {
    name: 'Laura Fernandez',
    title: 'How CSULB is Harnessing AI for Educational Excellence',
    text: '<p><strong>Introduction</strong></p>\r\n' +
      '<p>Artificial Intelligence (AI) is revolutionizing various sectors, including education. CSULB is at the forefront of integrating AI into its educational framework to enhance teaching, learning, and administrative processes.</p>\r\n' +
      '<p><strong>AI Steering Committee</strong></p>\r\n' +
      '<p>The AI Steering Committee at CSULB plays a crucial role in implementing AI technologies across campus. Co-chaired by Karyn Scissum Gunn, Provost and Senior Vice President for Academic Affairs, and Beth Lesen, Vice President of Student Affairs, the committee ensures ethical and effective use of AI.</p>\r\n' +
      '<p><strong>Microsoft Enterprise Copilot</strong></p>\r\n' +
      '<p>One of the latest additions to CSULB&rsquo;s AI toolkit is Microsoft Enterprise Copilot, which leverages GPT-4 for secure AI applications. This tool assists in writing, presentations, and data analysis while ensuring that personal and university data is protected.</p>\r\n' +
      '<p><strong>AI Technology Website and Workshops</strong></p>\r\n' +
      '<p>CSULB has launched an AI Technology website, which serves as a resource for students and faculty. The website includes information on AI tools, guidelines for generative AI, and upcoming workshops. These workshops, hosted by Academic Technology Services, aim to educate the campus community on the latest AI developments and their applications.</p>\r\n' +
      '<p><strong>Conclusion</strong></p>\r\n' +
      '<p>CSULB&rsquo;s commitment to integrating AI into its educational framework is preparing students and faculty for a future where AI plays a pivotal role. These efforts highlight the university&rsquo;s dedication to staying at the forefront of technological innovation in education.</p>',
    subject: 'research',
    password: 'password',
    id: 433367,
    image: '/uploads/1722732935824-875355119-researchcsulb.jpg',
    date: '08/03/2024'
  },
  {
  name: 'Priya Patel',
  title: 'AI Transformations in CSULB Classrooms',
  text: '<p><strong>Introduction</strong></p>\r\n' +
    '<p>Artificial Intelligence (AI) and Machine Learning (ML) are transforming the educational landscape at CSULB. This article explores the various ways these technologies are being utilized to enhance teaching and learning.</p>\r\n' +
    '<p><strong>AI-Powered Tools</strong></p>\r\n' +
    '<p>CSULB has introduced AI-powered tools like Microsoft Enterprise Copilot, which assist in various academic tasks such as writing, presentations, and data analysis. These tools ensure data security and provide significant aid to both students and faculty.</p>\r\n' +
    '<p><strong>Turnitin AI Detection</strong></p>\r\n' +
    '<p>To maintain academic integrity, CSULB faculty can now use Turnitin&rsquo;s AI detection tool, which identifies AI-generated content in student submissions. This ensures that students adhere to academic standards and produce original work.</p>\r\n' +
    '<p><strong>Professional Development</strong></p>\r\n' +
    '<p>Academic Technology Services at CSULB offers numerous events and workshops focused on AI and its applications. These sessions provide faculty and staff with the knowledge and skills needed to effectively integrate AI into their teaching practices.</p>\r\n' +
    '<p><strong>Conclusion</strong></p>\r\n' +
    '<p>CSULB&rsquo;s adoption of AI and ML technologies is revolutionizing its educational practices. By leveraging these tools, the university is enhancing the learning experience and preparing students for a future where AI plays a crucial role.</p>',
  subject: 'mlai',
  password: 'password',
  id: 178301,
  image: '/uploads/1722732998384-738401273-csulbaiml.jpg',
  date: '08/03/2024'
},
{
  name: 'John Harris',
  title: 'Enhancing Cybersecurity at CSULB',
  text: '<p><strong>Introduction</strong></p>\r\n' +
    "<p>As cyber threats become more sophisticated, CSULB is proactively enhancing its cybersecurity measures to protect its digital infrastructure. This article discusses the university's strategies and initiatives to ensure a secure digital environment.</p>\r\n" +
    '<p><strong>AI-Driven Security Solutions</strong></p>\r\n' +
    '<p>CSULB is implementing advanced AI-driven security solutions to detect and respond to cyber threats in real-time. These solutions analyze vast amounts of data to identify unusual patterns and potential security breaches.</p>\r\n' +
    '<p><strong>Cybersecurity Education</strong></p>\r\n' +
    '<p>The university is also focusing on educating students and staff about best practices in cybersecurity. Regular workshops and training sessions are conducted to raise awareness about common threats and preventive measures.</p>\r\n' +
    '<p><strong>Collaboration with Industry Experts</strong></p>\r\n' +
    "<p>CSULB collaborates with industry experts to stay updated on the latest cybersecurity trends and technologies. This partnership ensures that the university's cybersecurity infrastructure is robust and capable of handling emerging threats.</p>\r\n" +
    '<p><strong>Conclusion</strong></p>\r\n' +
    '<p>CSULB&rsquo;s commitment to enhancing cybersecurity ensures a safe and secure digital environment for its community. By implementing advanced technologies and educating its members, the university is well-prepared to tackle modern cyber threats.</p>',
  subject: 'cybersec',
  password: 'password',
  id: 988299,
  image: '/uploads/1722733065897-851912313-cyberseccsulb.jpeg',
  date: '08/03/2024'
},
{
  name: 'Emily Nguyen',
  title: 'Software Engineering at CSULB: Embracing the Future',
  text: '<p><strong>Introduction</strong></p>\r\n' +
    '<p>The software engineering program at CSULB is constantly evolving to keep pace with industry advancements. This article explores the latest trends and innovations in software engineering education at the university.</p>\r\n' +
    '<p><strong>Low-Code/No-Code Platforms</strong></p>\r\n' +
    '<p>CSULB is incorporating low-code and no-code development platforms into its curriculum. These platforms allow students to build applications with minimal coding, speeding up the development process and making it more accessible.</p>\r\n' +
    '<p><strong>DevSecOps Integration</strong></p>\r\n' +
    '<p>The program emphasizes DevSecOps, integrating security into the development process from the start. This approach ensures that students learn to build secure software, addressing potential vulnerabilities early in the development lifecycle.</p>\r\n' +
    '<p><strong>Microservices Architecture</strong></p>\r\n' +
    '<p>CSULB&rsquo;s software engineering courses now include microservices architecture, which breaks down applications into smaller, independent services. This architecture enhances scalability and resilience, preparing students for modern software development challenges.</p>\r\n' +
    '<p><strong>Conclusion</strong></p>\r\n' +
    '<p>CSULB&rsquo;s software engineering program is at the cutting edge of educational innovation. By integrating the latest industry trends and technologies, the university ensures that its graduates are well-equipped to excel in the dynamic field of software engineering.</p>',
  subject: 'swe',
  password: 'password',
  id: 103331,
  image: '/uploads/1722733169836-745166797-csulbswe.jpg',
  date: '08/03/2024'
},
{
  name: 'Chris Johnson',
  title: 'Upcoming Tech Events at CSULB You Can’t Miss',
  text: '<p><strong>Introduction</strong></p>\r\n' +
    '<p>CSULB hosts a variety of tech-related events throughout the year, providing valuable opportunities for students to learn, network, and showcase their skills. Here are some of the must-attend events in 2024.</p>\r\n' +
    '<p><strong>Women in Engineering Conference</strong></p>\r\n' +
    '<p>Scheduled for March 23, 2024, this conference focuses on empowering women in engineering. It features keynote speakers, panel discussions, and networking sessions, aiming to inspire and support female engineers.</p>\r\n' +
    '<p><strong>Engineering Job &amp; Internship Fair</strong></p>\r\n' +
    '<p>On September 21, 2024, the Engineering Job &amp; Internship Fair will take place in the USU Ballrooms. This event connects students with potential employers, offering numerous opportunities for internships and full-time positions.</p>\r\n' +
    '<p><strong>Senior Design Project Expo</strong></p>\r\n' +
    '<p>Held on May 8-9, 2024, the Senior Design Project Expo showcases the innovative projects developed by graduating students. It&rsquo;s an excellent opportunity for students to present their work to industry professionals and peers.</p>\r\n' +
    '<p><strong>Conclusion</strong></p>\r\n' +
    '<p>Attending these tech events at CSULB provides students with invaluable experiences, from networking with professionals to gaining insights into the latest industry trends. Don&rsquo;t miss out on these opportunities to enhance your educational journey and career prospects.</p>',
  subject: 'events',
  password: 'password',
  id: 663848,
  image: '/uploads/1722733222802-316635715-csulbevents.jpg',
  date: '08/03/2024'
},
{
  name: 'Michael Stevens',
  title: 'Virtual Reality Operations Club (VROC) at CSULB',
  text: '<p>The Virtual Reality Operations Club (VROC) at California State University Long Beach (CSULB) is an innovative student organization dedicated to exploring and advancing virtual reality (VR) and augmented reality (AR) technologies. Founded with the mission to provide hands-on experience and foster a collaborative environment, VROC engages students in cutting-edge VR and AR projects that span various applications from gaming to education and beyond.</p>\r\n' +
    '<h4>Club Activities and Projects</h4>\r\n' +
    '<ol>\r\n' +
    '<li>\r\n' +
    '<p><strong>Hands-On Workshops</strong>: VROC regularly conducts workshops where members can learn about VR/AR development, including software like Unity and hardware such as Oculus Rift and HTC Vive. These workshops are designed to cater to both beginners and advanced users, ensuring everyone can enhance their skills.</p>\r\n' +
    '</li>\r\n' +
    '<li>\r\n' +
    '<p><strong>Collaborative Projects</strong>: Members of VROC collaborate on a variety of projects, often partnering with other student organizations or departments. One notable project is the AR cooking simulator game, which was developed to provide an immersive learning experience in culinary arts.</p>\r\n' +
    '</li>\r\n' +
    '<li>\r\n' +
    '<p><strong>Industry Engagement</strong>: The club organizes guest lectures and networking events with industry professionals. These sessions offer insights into the latest trends in VR/AR and provide valuable networking opportunities for students aspiring to enter the field.</p>\r\n' +
    '</li>\r\n' +
    '<li>\r\n' +
    '<p><strong>Competitions and Hackathons</strong>: VROC members frequently participate in competitions and hackathons, both locally and nationally. These events challenge students to develop innovative VR/AR applications within a limited time frame, fostering creativity and teamwork.</p>\r\n' +
    '</li>\r\n' +
    '</ol>\r\n' +
    '<h4>Membership and Community</h4>\r\n' +
    '<p>VROC is open to all students at CSULB, regardless of their major or level of experience. The club prides itself on being an inclusive community where students can share ideas, collaborate on projects, and develop their expertise in VR/AR technologies.</p>\r\n' +
    "<p>By joining VROC, students not only gain technical skills but also develop soft skills such as teamwork, project management, and public speaking. The club's activities are designed to prepare members for careers in the rapidly growing field of virtual and augmented reality.</p>\r\n" +
    '<p>For more information about VROC and how to get involved, you can visit the <a href="https://csulb.campuslabs.com/engage/organization/virtualreality">CSULB Student Organizations page</a>.</p>',
  subject: 'vrar',
  password: 'password',
  id: 294093,
  image: '/uploads/1722733404971-628604199-vr event.jpeg',
  date: '08/03/2024'
}

];
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/uploads')); // Save files to public/uploads directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const ITEMS_PER_PAGE = 9; // Number of items to display per page

app.get("/", (req, res) => {
  res.render("index", { searchQuery: "", subject: "", apiKey: process.env.TINYMCE_API_KEY });
});

app.get("/faq", (req, res) => {
  res.render("index", { searchQuery: "", subject: "faq", apiKey: process.env.TINYMCE_API_KEY });
});

app.get("/careers", (req, res) => {
  res.render("index", { searchQuery: "", subject: "careers", apiKey: process.env.TINYMCE_API_KEY });
});

app.get("/research", (req, res) => {
  res.render("index", { searchQuery: "", subject: "research", apiKey: process.env.TINYMCE_API_KEY });
});

app.get("/events", (req, res) => {
  res.render("index", { searchQuery: "", subject: "events", apiKey: process.env.TINYMCE_API_KEY });
});

app.get("/swe", (req, res) => {
  res.render("index", { searchQuery: "", subject: "swe", apiKey: process.env.TINYMCE_API_KEY });
});

app.get("/mlai", (req, res) => {
  res.render("index", { searchQuery: "", subject: "mlai", apiKey: process.env.TINYMCE_API_KEY });
});

app.get("/vrar", (req, res) => {
  res.render("index", { searchQuery: "", subject: "vrar", apiKey: process.env.TINYMCE_API_KEY });
});

app.get("/cybersec", (req, res) => {
  res.render("index", { searchQuery: "", subject: "cybersec", apiKey: process.env.TINYMCE_API_KEY });
});

app.get("/post", (req, res) => {
  res.render("post", { searchQuery: "", subject: "", apiKey: process.env.TINYMCE_API_KEY });
});

app.get("/explore", (req, res) => {
  const subject = req.query.subject || "";
  const searchQuery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;

  let filteredContent = content;

  if (subject) {
    filteredContent = filteredContent.filter(item => item.subject === subject);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredContent = filteredContent.filter(item =>
      item.title.toLowerCase().includes(query) || item.name.toLowerCase().includes(query)
    );
  }

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = page * ITEMS_PER_PAGE;
  const paginatedContent = filteredContent.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredContent.length / ITEMS_PER_PAGE);

  res.render("explore", { content: paginatedContent, page, totalPages, errorMessage: "", subject, searchQuery, apiKey: process.env.TINYMCE_API_KEY });
});

app.get("/edit/:id", (req, res) => {
  const card = content.find(item => item.id == req.params.id);
  if (card) {
    res.render("edit", { card, errorMessage: "", searchQuery: "", subject: "", apiKey: process.env.TINYMCE_API_KEY });
  } else {
    res.status(404).send("Card not found");
  }
});

app.post("/edit/:id", upload.single('image'), (req, res) => {
  const cardIndex = content.findIndex(item => item.id == req.params.id);
  if (cardIndex !== -1) {
    const card = content[cardIndex];
    card.name = req.body.name;
    card.title = req.body.title;
    card.text = req.body.text;
    card.subject = req.body.subject;
    if (req.file) {
      card.image = `/uploads/${req.file.filename}`;
    }
    res.redirect(`/explore?page=1`);
  } else {
    res.status(404).send("Card not found");
  }
});

app.post("/delete/:id", (req, res) => {
  const cardIndex = content.findIndex(item => item.id == req.params.id);
  if (cardIndex !== -1) {
    content.splice(cardIndex, 1);
    res.redirect(`/explore?page=1`);
  } else {
    res.status(404).send("Card not found");
  }
});

app.post("/verify-password/:id", (req, res) => {
  const card = content.find(item => item.id == req.params.id);
  const { password } = req.body;
  if (card && card.password === password) {
    res.json({ success: true, id: card.id });
  } else {
    res.json({ success: false });
  }
});

app.post("/explore", upload.single('image'), (req, res) => {
  const data = req.body;
  const randomNum = Math.floor(100000 + Math.random() * 900000);

  data.id = randomNum;
  data.image = `/uploads/${req.file.filename}`;

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  data.date = today;
  content.push(data);
  console.log(data);

  res.redirect(`/explore?page=${Math.ceil(content.length / ITEMS_PER_PAGE)}`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
