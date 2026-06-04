// Structured data for the 6 SaferKid simulator scenes with updated academic bibliographies.
export interface Choice {
  text: string;
  videoUrl: string;
  outcomeText: string;
  expertOpinion: string;
}

export interface Scene {
  id: number;
  title: string;
  category: string;
  introVideoUrl: string;
  questionText: string;
  choiceA: Choice;
  choiceB: Choice;
}

export const SCENES: Scene[] = [
  {
    id: 1,
    title: "Scene 1: Disturbing Content (Boiling Egg)",
    category: "Disturbing Content",
    introVideoUrl: "https://youtu.be/wCcweOlhKkY",
    questionText: "Your child is visibly upset after watching a video of a boiling egg with a voice-over monologue that gets increasingly creepy. How do you respond?",
    choiceA: {
      text: "You grab the tablet, close the video, and say: 'This is bad for you. No more tablet today!'",
      videoUrl: "https://youtu.be/QLuh_MIIqRs",
      outcomeText: "When you grab the tablet, your child feels punished for something they didn't do. They shut down, hide their feelings, and learn that they cannot trust you with uncomfortable digital experiences. The lingering doubt remains, but now it's hidden from you.",
      expertOpinion: "According to Livingstone and Blum-Ross (2020), restrictive mediation and the policing of screen time often backfire by generating parent-child conflict and evasive technology use, ultimately sacrificing children's opportunities to learn, connect, and build digital resilience."
    },
    choiceB: {
      text: "You alone watch the video, then sit with your child and ask: 'What did you think of that video? Let's talk about it.'",
      videoUrl: "https://youtu.be/NlekuslRWIY",
      outcomeText: "When you watch the video together and talk about it, your child feels safe and validated. They understand that the creepy monologue was just a fictional voice, not a real threat. They learn that they can always come to you when something online feels weird or scary.",
      expertOpinion: "Active mediation, which involves co-viewing and discussing digital content, is recommended by pediatric guidelines (Radesky, 2016) to help children develop critical thinking skills, digital discernment, and safer media habits (Baguri et al., 2025)."
    }
  },
  {
    id: 2,
    title: "Scene 2: Algorithm Escalation (Stunt Challenges)",
    category: "Algorithm Escalation",
    introVideoUrl: "https://youtu.be/xnX_T-3sS6o",
    questionText: "Your child is watching relatively safe backyard physical stunt videos, but the autoplay algorithm quickly escalates to showing highly dangerous stunts with severe injuries. What is your move?",
    choiceA: {
      text: "You immediately take the tablet away, turn off autoplay, and ban stunt videos entirely.",
      videoUrl: "https://youtu.be/1JZAENgvP3U",
      outcomeText: "Banning the videos and taking the tablet away stops the immediate exposure, but leaves the child frustrated and confused. They don't understand why the backyard fun they liked suddenly became forbidden, and they might seek to watch it elsewhere without your supervision.",
      expertOpinion: "While technical restrictions offer immediate control, relying solely on bans fails to build children's critical thinking; instead, active mediation and open discussions are essential to help them understand and independently navigate online risks (Baguri et al., 2025; Tan et al., 2025)."
    },
    choiceB: {
      text: "You pause the video, point out the safety gear (or lack thereof), and explain how algorithms try to keep them watching by showing crazier things.",
      videoUrl: "https://youtu.be/-1u_-qvgxn0_",
      outcomeText: "By explaining the algorithm's trick and discussing the physical danger of the stunts, you empower your child. They start to look at the 'next video' recommendations with skepticism and learn to recognize when a video is trying to manipulate their attention.",
      expertOpinion: "Fostering digital literacy that includes understanding how algorithms govern content is essential, as active parental parental mediation helps children develop the critical thinking skills needed to navigate digital environments safely (Baguri et al., 2025)."
    }
  },
  {
    id: 3,
    title: "Scene 3: Health Misinformation (Scary Health Claims)",
    category: "Misinformation",
    introVideoUrl: "https://youtu.be/lpXfKrXcyDE",
    questionText: "Your child runs to you terrified, saying they watched a video claiming a common food ingredient (like sugar or gluten) causes immediate, horrible diseases, showing scary-looking charts. How do you handle this?",
    choiceA: {
      text: "You wave your hand dismissively and say: 'That's just fake news. Don't believe everything you see on that screen.'",
      videoUrl: "https://youtu.be/MIplOSbhVXo",
      outcomeText: "Dismissing their fear as 'just fake news' doesn't stop the child's anxiety. They still saw the scary charts and the authoritative voice. They learn that their digital fears are silly to you, so they stop sharing them, but the anxiety lingers.",
      expertOpinion: "Simply dismissing questionable content fails to build critical digital literacy. Evidence shows that active mediation—discussing and co-viewing content—is essential to help children develop the discernment and verification skills needed to navigate online risks without undermining parental trust (Baguri et al., 2025; Helsper et al., 2024)."
    },
    choiceB: {
      text: "You sit down, open a trusted medical or educational website together, and research the claim to see if the video's sources are reliable.",
      videoUrl: "https://youtu.be/Y_8SS_aXoiE",
      outcomeText: "Fact-checking together turns a scary experience into a detective game. Your child learns how to look for credible sources, understand bias, and realizes that anyone can make a scary-looking video with a computer.",
      expertOpinion: "Co-viewing and active parental mediation are foundational to digital literacy, as collaboratively discussing and questioning online content helps children develop critical thinking and verification skills (Brisson-Boivin, 2018; APA, 2023)."
    }
  },
  {
    id: 4,
    title: "Scene 4: Behavior Modeling (Aggressive Streamers)",
    category: "Behavior Modeling",
    introVideoUrl: "https://youtu.be/QNtevn6yKEM",
    questionText: "You notice your child is starting to use aggressive language, screaming at their toys, and mimicking the hyper-reactive, angry behavior of their favorite gaming streamer. What do you do?",
    choiceA: {
      text: "You immediately block that streamer's channel and tell your child: 'He is bad-mannered. You are not allowed to watch him anymore.'",
      videoUrl: "https://youtu.be/zCKposavNmQ",
      outcomeText: "Blocking the streamer stops the immediate source, but your child feels angry and defensive of their 'friend'. They don't understand why the behavior that seemed funny and popular is suddenly 'bad-mannered', leading to resentment.",
      expertOpinion: "Because children form meaningful parasocial connections with media figures, restrictive mediation that abruptly limits access can erode trust, provoke evasive behaviors, and hinder their digital autonomy (MediaSmarts, 2023; Tan et al., 2025)."
    },
    choiceB: {
      text: "You watch a video of the streamer together, discuss why the streamer acts so angry (for views/money), and set healthy boundaries on behavior.",
      videoUrl: "https://youtu.be/gbhmlL4nARk",
      outcomeText: "Discussing the streamer's 'performance' helps your child separate the entertainer from real-world behavior. They realize the anger is an act designed to make money, and they agree that screaming at others in real life isn't cool.",
      expertOpinion: "Fostering digital literacy involves helping children recognize that creators often use emotional drama or 'clickbait' to maximize advertising revenue, which promotes their critical evaluation of online content (Radesky et al., 2024; Baguri et al., 2025)."
    }
  },
  {
    id: 5,
    title: "Scene 5: Inappropriate Content (Sneaky Age-Restricted Content)",
    category: "Inappropriate Content",
    introVideoUrl: "https://youtu.be/cXhHcZlo5A4",
    questionText: "Your child accidentally clicks on an innocent-looking cartoon thumbnail that actually contains highly inappropriate, age-restricted themes and scary imagery. They look shocked and guilty. What is your reaction?",
    choiceA: {
      text: "You scold them for clicking on it, grab the phone, and lock it with a strict parental control pin.",
      videoUrl: "https://youtu.be/9tJ01nIjr28",
      outcomeText: "Scolding your child makes them feel intense guilt and shame for an accident. They learn that clicking on the wrong thing leads to anger and loss of privileges, so they will go to great lengths to hide any future accidents from you.",
      expertOpinion: "Experts caution against restrictive mediation, as banning online activities can undermine children's trust, leading them to evade parental scrutiny rather than turning to their parents when encountering digital problems (Livingstone et al., 2020)."
    },
    choiceB: {
      text: "You comfort them, explain that it was an accident caused by sneaky design, and show them how to flag/report the video together.",
      videoUrl: "https://youtu.be/oqmgM6fZCXs",
      outcomeText: "By comforting them and flagging the video, you turn a scary accident into an act of digital citizenship. Your child feels relieved, understands they aren't in trouble, and learns how to actively protect themselves and others online.",
      expertOpinion: "Teaching youth to report harmful content fosters digital citizenship and collective resilience. It shifts their role from passive consumers to active agents advocating for safer, more inclusive online environments (MediaSmarts, 2023)."
    }
  },
  {
    id: 6,
    title: "Scene 6: Parasocial Relationships (Virtual Friend Confusion)",
    category: "Relationship Confusion",
    introVideoUrl: "https://youtu.be/9cF9cPOAzgs",
    questionText: "Your child insists on buying expensive merchandise from a streamer because they genuinely believe the streamer is their 'best friend' who talks directly to them. How do you address this?",
    choiceA: {
      text: "You tell them bluntly: 'That streamer doesn't know you exist. They just want our money. No merchandise.'",
      videoUrl: "https://youtu.be/RRNH1MTHqqI",
      outcomeText: "The blunt truth feels like a harsh rejection. Your child feels embarrassed, misunderstood, and defensive. They still feel the connection to the streamer but now feel they have to hide their enthusiasm from you.",
      expertOpinion: "Abruptly severing a child's parasocial connections through restrictive mediation ignores their genuine emotional attachments, ultimately undermining trust, provoking evasive behaviors, and making them less likely to confide in trusted adults about their online experiences (MediaSmarts, 2023; Tan et al., 2025)."
    },
    choiceB: {
      text: "You acknowledge their excitement, but gently explain how broadcasting works (one-to-many) and suggest supporting them in other free ways.",
      videoUrl: "https://youtu.be/SVps7fvZUKs",
      outcomeText: "By validating their feelings first, you keep the door open. Explaining the 'one-to-many' broadcast model helps them understand the streamer's business without feeling foolish. They feel supported and understand the financial boundary.",
      expertOpinion: "Explaining the structural and commercial mechanics behind parasocial media relationships helps children establish healthy boundaries, validating their emotional experiences while actively fostering critical digital and media literacy (MediaSmarts, 2023; Baguri et al., 2025)."
    }
  }
];
