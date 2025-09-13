export const notes = {
  curriculum: {
    coding: {
      python: `https://drive.google.com/file/d/1euI-FztFVaaIBk4EhqFLPQ2h6UGdgJSt/view?usp=drivesdk`,
      'c++': `https://drive.google.com/file/d/1ez5QHrEcKAL_bnhMarN1fSgsJxQ0haHw/view?usp=drivesdk`,
      java: `
## Comprehensive Java Notes

### 1. Introduction to Java
- **What is Java?**: A class-based, object-oriented programming language designed for portability.
- **History**: Developed by James Gosling at Sun Microsystems, released in 1995.
- **Java Virtual Machine (JVM)**: An abstract machine that enables a computer to run a Java program. The "Write Once, Run Anywhere" (WORA) principle.
- **Setting up the Environment**: Installing the Java Development Kit (JDK) and a code editor or IDE (like Eclipse, IntelliJ, or VS Code).

### 2. Java Basics
- **Syntax**: \`public class Main { public static void main(String[] args) { ... } }\`
- **Variables and Data Types**:
  - **Primitive**: \`byte\`, \`short\`, \`int\`, \`long\`, \`float\`, \`double\`, \`boolean\`, \`char\`.
  - **Non-Primitive**: \`String\`, Arrays, Classes.
- **Operators**: Similar to C++.
- **Input**: Using the \`Scanner\` class. \`Scanner myObj = new Scanner(System.in);\`

### 3. Control Flow
- **Conditional Statements**: \`if\`, \`else if\`, \`else\`.
- **Switch Statement**: \`switch (expression) { case value: ... break; default: ... }\`
- **Loops**: \`for\`, \`while\`, \`do-while\`, enhanced \`for-each\` loop.

### 4. Object-Oriented Programming (OOP)
- **Classes and Objects**: The fundamental concepts of Java.
- **Constructors**: A special method used to initialize objects.
- **Methods**: A block of code that runs when it is called.
- **Keywords**: \`this\` (refers to the current object), \`super\` (refers to the superclass object).
- **The Four Pillars of OOP**:
  - **Inheritance**: \`class Child extends Parent { ... }\` (using \`extends\` keyword).
  - **Encapsulation**: Using getters and setters to control access to private data.
  - **Polymorphism**:
    - **Method Overloading**: Same method name, different parameters.
    - **Method Overriding**: Same method signature in a subclass.
  - **Abstraction**: Hiding implementation details using abstract classes and interfaces.
    - \`abstract class\`: Cannot be instantiated.
    - \`interface\`: A completely abstract class with only abstract methods.

### 5. Java Collections Framework
- A set of classes and interfaces that implement commonly reusable data structures.
- **Interfaces**: \`List\`, \`Set\`, \`Map\`, \`Queue\`.
- **Classes**:
  - \`ArrayList\`, \`LinkedList\` (implements \`List\`).
  - \`HashSet\`, \`TreeSet\` (implements \`Set\`).
  - \`HashMap\`, \`TreeMap\` (implements \`Map\`).

### 6. Exception Handling
- **Checked Exceptions**: Checked at compile-time (e.g., \`IOException\`).
- **Unchecked Exceptions**: Checked at runtime (e.g., \`NullPointerException\`).
- **\`try-catch-finally\` block**:
  - \`try\`: The code to be monitored for exceptions.
  - \`catch\`: Catches the exception.
  - \`finally\`: Always executes, regardless of an exception.
- **\`throw\` and \`throws\` keywords**.

### 7. Java I/O
- \`java.io\` package provides classes for input and output operations.
- **Stream Classes**: \`FileInputStream\`, \`FileOutputStream\`, \`BufferedReader\`, \`PrintWriter\`.
`,
    },
    'data structure': `
## Detailed Data Structures Notes

### 1. Introduction
- **What is a Data Structure?**: A way of organizing and storing data in a computer so that it can be accessed and modified efficiently.
- **Why are they important?**: They are essential for designing efficient algorithms and managing large amounts of data.

### 2. Common Data Structures
- **Arrays**:
  - **Description**: A collection of items stored at contiguous memory locations.
  - **Pros**: Fast access to elements (O(1)).
  - **Cons**: Fixed size, costly insertion/deletion (O(n)).
- **Linked Lists**:
  - **Description**: A linear data structure where elements are not stored contiguously. Each element (node) points to the next.
  - **Types**: Singly, Doubly, Circular.
  - **Pros**: Dynamic size, efficient insertion/deletion (O(1)).
  - **Cons**: Slow access to elements (O(n)).
- **Stacks**:
  - **Description**: A LIFO (Last-In, First-Out) structure.
  - **Operations**: \`push\` (add), \`pop\` (remove), \`peek\` or \`top\` (view top element).
  - **Applications**: Function calls, undo mechanisms.
- **Queues**:
  - **Description**: A FIFO (First-In, First-Out) structure.
  - **Operations**: \`enqueue\` (add), \`dequeue\` (remove), \`front\`, \`rear\`.
  - **Applications**: Task scheduling, print queues.
- **Trees**:
  - **Description**: A hierarchical structure with a root node and child nodes.
  - **Types**: Binary Tree, Binary Search Tree (BST), AVL Tree, B-Tree.
  - **BST Property**: Left child < Parent < Right child.
  - **Applications**: File systems, databases.
- **Graphs**:
  - **Description**: A collection of nodes (vertices) and edges that connect them.
  - **Types**: Directed, Undirected; Weighted, Unweighted.
  - **Representations**: Adjacency Matrix, Adjacency List.
  - **Algorithms**: Breadth-First Search (BFS), Depth-First Search (DFS).
  - **Applications**: Social networks, GPS navigation.
- **Hash Tables**:
  - **Description**: A data structure that maps keys to values using a hash function.
  - **How it works**: The hash function computes an index into an array of buckets or slots, from which the desired value can be found.
  - **Pros**: Very fast on average for insertion, deletion, and search (O(1)).
  - **Cons**: Worst-case performance can be slow (O(n)), requires a good hash function.

`,
    'data science': `
## Detailed Data Science Notes

### 1. Introduction to Data Science
- **What is Data Science?**: An interdisciplinary field that uses scientific methods, processes, algorithms, and systems to extract knowledge and insights from structured and unstructured data.
- **The Data Science Lifecycle**:
  1. Business Understanding
  2. Data Acquisition
  3. Data Cleaning and Preprocessing
  4. Data Exploration (EDA)
  5. Feature Engineering
  6. Modeling
  7. Evaluation
  8. Deployment

### 2. Key Concepts
- **Data Analysis**: The process of inspecting, cleansing, transforming, and modeling data with the goal of discovering useful information.
- **Machine Learning (ML)**: A subset of AI that provides systems the ability to automatically learn and improve from experience without being explicitly programmed.
  - **Supervised Learning**: Learning from labeled data (e.g., classification, regression).
  - **Unsupervised Learning**: Learning from unlabeled data (e.g., clustering, dimensionality reduction).
  - **Reinforcement Learning**: Learning through trial and error (rewards and punishments).
- **Data Visualization**: The graphical representation of data. It is crucial for EDA and communicating results.
- **Big Data**: Extremely large and complex datasets that cannot be easily managed with traditional data-processing application software. The "3 Vs": Volume, Velocity, and Variety.

### 3. Popular Python Libraries for Data Science
- **Pandas**:
  - **Purpose**: Data manipulation and analysis.
  - **Key Data Structures**: \`DataFrame\` and \`Series\`.
  - **Core Functionality**: Reading/writing data (CSV, Excel), cleaning data (handling missing values), filtering, grouping, merging.
- **NumPy**:
  - **Purpose**: Fundamental package for numerical computation.
  - **Key Data Structure**: \`ndarray\` (n-dimensional array).
  - **Core Functionality**: Fast array operations, mathematical functions, linear algebra.
- **Scikit-learn**:
  - **Purpose**: Machine learning library.
  - **Core Functionality**:
    - **Classification**: SVM, Decision Trees, Random Forest.
    - **Regression**: Linear Regression, Ridge Regression.
    - **Clustering**: K-Means, DBSCAN.
    - **Model Selection**: \`train_test_split\`, Cross-validation.
- **Matplotlib**:
  - **Purpose**: The foundational library for creating static, animated, and interactive visualizations.
  - **Core Functionality**: Line plots, scatter plots, bar charts, histograms.
- **Seaborn**:
  - **Purpose**: A high-level interface for drawing attractive and informative statistical graphics, built on top of Matplotlib.
  - **Core Functionality**: Easier to create complex plots like heatmaps, pair plots, and violin plots.
`,
    English: `
## Detailed English Notes

### 1. Grammar
- **Parts of Speech**:
  - **Nouns**: Person, place, thing, idea (e.g., *student*, *school*, *book*, *knowledge*).
  - **Pronouns**: Replaces a noun (e.g., *he*, *she*, *it*, *they*).
  - **Verbs**: Action or state of being (e.g., *learn*, *is*, *become*).
  - **Adjectives**: Describes a noun (e.g., *smart*, *beautiful*).
  - **Adverbs**: Describes a verb, adjective, or another adverb (e.g., *quickly*, *very*).
  - **Prepositions**: Shows relationship between nouns/pronouns (e.g., *in*, *on*, *at*).
  - **Conjunctions**: Connects words, phrases, or clauses (e.g., *and*, *but*, *or*).
  - **Interjections**: Expresses strong emotion (e.g., *Wow!*, *Oh!*).
- **Sentence Structure**:
  - **Subject**: Who or what the sentence is about.
  - **Predicate**: Tells something about the subject.
  - **Clauses**: Independent (can stand alone) and Dependent (cannot stand alone).
- **Tenses**:
  - **Past**: Simple, Continuous, Perfect, Perfect Continuous.
  - **Present**: Simple, Continuous, Perfect, Perfect Continuous.
  - **Future**: Simple, Continuous, Perfect, Perfect Continuous.
- **Punctuation**:
  - **Period (.)**: Ends a declarative sentence.
  - **Comma (,)**: Separates items in a list, clauses, etc.
  - **Question Mark (?)**: Ends an interrogative sentence.
  - **Exclamation Mark (!)**: Ends an exclamatory sentence.
  - **Apostrophe (')**: Shows possession or contractions.

### 2. Vocabulary Building
- **Synonyms and Antonyms**: Words with similar and opposite meanings.
- **Idioms and Phrases**: Expressions with a figurative meaning (e.g., *break a leg*).
- **Root Words, Prefixes, and Suffixes**: Understanding word parts to decode meaning.
- **Active Reading**: Look up unknown words as you read.

### 3. Communication Skills
- **Writing Skills**:
  - **Clarity and Conciseness**: Get to the point. Avoid jargon.
  - **Structure**: Introduction, Body, Conclusion. Use paragraphs effectively.
  - **Proofreading**: Always check for spelling and grammar errors.
- **Listening Skills**:
  - **Active Listening**: Pay full attention, ask clarifying questions, and paraphrase to show understanding.
- **Speaking Skills**:
  - **Pronunciation and Enunciation**: Speak clearly.
  - **Fluency**: The ability to speak smoothly and easily.
`,
  },
  'non-curriculum': {
    'Public Speaking and Debate Forums': `
## Public Speaking and Debate Notes

### 1. Structuring a Speech
- **The Introduction**: Grab the audience's attention (a hook), state your purpose, and provide a roadmap.
- **The Body**: Organize your main points logically (e.g., chronological, problem-solution). Support each point with evidence or examples.
- **The Conclusion**: Summarize your main points and leave a lasting impression (a call to action or a powerful statement).

### 2. Delivery Skills
- **Body Language**: Use confident posture, make eye contact, and use purposeful gestures.
- **Voice Modulation**: Vary your pitch, pace, and volume to keep the audience engaged and emphasize key points.
- **Pacing**: Avoid speaking too quickly. Use pauses for dramatic effect and to allow the audience to process information.

### 3. Handling Anxiety
- **Preparation is Key**: The more you practice, the more confident you will feel.
- **Breathing Techniques**: Practice deep breathing exercises to calm your nerves.
- **Visualize Success**: Imagine yourself giving a successful presentation.

### 4. Debate Fundamentals
- **Argumentation**: Construct logical arguments based on evidence (Claim, Evidence, Warrant).
- **Rebuttal**: Listen carefully to your opponent's arguments and identify flaws or counter-arguments.
- **Cross-Examination**: Asking pointed questions to expose weaknesses in your opponent's case.
`,
    'interview preparation': `
## Interview Preparation Notes

### 1. Before the Interview
- **Research**:
  - **The Company**: Understand their mission, values, products/services, and recent news.
  - **The Role**: Analyze the job description. Understand the key responsibilities and required qualifications.
- **Prepare Your Stories**:
  - **The STAR Method**: For answering behavioral questions.
    - **S (Situation)**: Describe the context.
    - **T (Task)**: Describe your responsibility.
    - **A (Action)**: Describe the steps you took.
    - **R (Result)**: Quantify the outcome.
- **Prepare Your Questions**: Have thoughtful questions ready to ask the interviewer about the role, the team, and the company culture.

### 2. During the Interview
- **First Impressions**: Professional attire, be on time, firm handshake (if in person).
- **Common Questions**:
  - **"Tell me about yourself."**: Prepare a concise, compelling "elevator pitch" about your background and qualifications.
  - **"Strengths and Weaknesses?"**: Be honest but strategic. For weaknesses, show self-awareness and a desire to improve.
  - **"Why do you want to work here?"**: Connect your skills and career goals to the company's mission and the specific role.
- **Body Language**: Maintain eye contact, sit up straight, and be an engaged listener.

### 3. After the Interview
- **Thank-You Note**: Send a personalized thank-you email within 24 hours to each person you interviewed with.
- **Follow-up**: If you haven't heard back by the timeline they provided, a polite follow-up is appropriate.
`,
    'personality development': `
## Personality Development Notes

### 1. Understanding Yourself
- **Self-Awareness**: Identifying your strengths, weaknesses, values, beliefs, and emotions.
- **SWOT Analysis**: Strengths, Weaknesses, Opportunities, Threats.

### 2. Key Areas for Development
- **Self-Confidence**: Believe in your abilities. Set small, achievable goals to build momentum.
- **Communication Skills**: Learn to express yourself clearly and listen effectively (verbal, non-verbal, and written).
- **Positive Attitude**: Focus on solutions, not problems. Practice gratitude and mindfulness.
- **Time Management**: Prioritize tasks (e.g., using the Eisenhower Matrix), avoid procrastination, and set realistic deadlines.
- **Leadership Skills**: Take initiative, motivate others, and be accountable.
- **Emotional Intelligence (EQ)**: The ability to understand and manage your own emotions, and those of others.

### 3. Building Good Habits
- **Reading**: Read books on self-improvement, biographies, and industry-related topics.
- **Networking**: Build meaningful relationships with people.
- **Continuous Learning**: Be curious and open to new skills and knowledge.
`,
    'soft skills': `
## Essential Soft Skills Notes

### 1. Communication
- **What it is**: The ability to convey information to others effectively and efficiently.
- **In Practice**: Active listening, clear writing in emails, confident speaking in meetings.

### 2. Teamwork
- **What it is**: The collaborative effort of a group to achieve a common goal.
- **In Practice**: Being reliable, respecting others' opinions, offering and asking for help.

### 3. Problem-Solving
- **What it is**: The ability to identify problems, brainstorm and analyze answers, and implement the best solutions.
- **In Practice**: Breaking down a problem, using logic and creativity, not being afraid to ask for help.

### 4. Time Management
- **What it is**: The process of organizing and planning how to divide your time between specific activities.
- **In Practice**: Prioritizing tasks, setting goals, using a planner or calendar.

### 5. Critical Thinking
- **What it is**: The objective analysis and evaluation of an issue in order to form a judgment.
- **In Practice**: Questioning assumptions, considering different viewpoints, analyzing evidence.

### 6. Adaptability
- **What it is**: The ability to adjust to new conditions.
- **In Practice**: Being open to change, learning new skills quickly, staying calm under pressure.

### 7. Leadership
- **What it is**: The ability to motivate a group of people toward a common goal.
- **In Practice**: Mentoring others, taking ownership of projects, inspiring team members.
`,
  },
};