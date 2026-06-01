// Dados estruturados das 6 cenas do simulador SaferKid extraídos diretamente do content.json reestruturado.
// Cada cena possui: Intro Video, Branching Question, Choices A e B (com seus respectivos vídeos e outcomes), e a opinião dos especialistas (Experts).

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
      expertOpinion: "Restrictive mediation (grabbing, banning) often backfires. According to Livingstone & Helsper (2008), it reduces children's digital literacy and limits their coping mechanisms. It also creates a barrier of secrecy, making children less likely to report future encounters with disturbing content."
    },
    choiceB: {
      text: "You alone watch the video, then sit with your child and ask: 'What did you think of that video? Let's talk about it.'",
      videoUrl: "https://youtu.be/NlekuslRWIY",
      outcomeText: "When you watch the video together and talk about it, your child feels safe and validated. They understand that the creepy monologue was just a fictional voice, not a real threat. They learn that they can always come to you when something online feels weird or scary.",
      expertOpinion: "Active mediation is highly recommended by developmental pediatricians (Radesky et al., 2016). Discussing content together helps children process fear, build critical thinking, and strengthens the parent-child trust bond, which is the ultimate safety net."
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
      videoUrl: "https://youtu.be/fGiF5B34DLU",
      outcomeText: "Banning the videos and taking the tablet away stops the immediate exposure, but leaves the child frustrated and confused. They don't understand why the backyard fun they liked suddenly became forbidden, and they might seek to watch it elsewhere without your supervision.",
      expertOpinion: "While turning off autoplay is a great technical step, sudden bans without explanation do not teach children *why* the content is dangerous. Technical restriction alone cannot replace cognitive mediation (Shin & Lwin, 2017)."
    },
    choiceB: {
      text: "You pause the video, point out the safety gear (or lack thereof), and explain how algorithms try to keep them watching by showing crazier things.",
      videoUrl: "https://youtu.be/tftVLNsh9n4",
      outcomeText: "By explaining the algorithm's trick and discussing the physical danger of the stunts, you empower your child. They start to look at the 'next video' recommendations with skepticism and learn to recognize when a video is trying to manipulate their attention.",
      expertOpinion: "Teaching children about algorithmic curation (algorithmic literacy) is crucial in the modern media landscape. It shifts the child from a passive consumer to an active, critical viewer (Buckingham, 2015)."
    }
  },
  {
    id: 3,
    title: "Scene 3: Health Misinformation (Scary Health Claims)",
    category: "Misinformation",
    introVideoUrl: "https://youtu.be/kJcvyve7SOU",
    questionText: "Your child runs to you terrified, saying they watched a video claiming a common food ingredient (like sugar or gluten) causes immediate, horrible diseases, showing scary-looking charts. How do you handle this?",
    choiceA: {
      text: "You wave your hand dismissively and say: 'That's just fake news. Don't believe everything you see on that screen.'",
      videoUrl: "https://youtu.be/6BT06_3vHRM",
      outcomeText: "Dismissing their fear as 'just fake news' doesn't stop the child's anxiety. They still saw the scary charts and the authoritative voice. They learn that their digital fears are silly to you, so they stop sharing them, but the anxiety lingers.",
      expertOpinion: "Simply labeling content as 'fake' does not build digital literacy. Children need guidance to understand *how* to verify claims. Dismissal can lead to cognitive dissonance and unresolved anxiety (Wardle & Derakhshan, 2017)."
    },
    choiceB: {
      text: "You sit down, open a trusted medical or educational website together, and research the claim to see if the video's sources are reliable.",
      videoUrl: "https://youtu.be/2lvzSZ0j-DY",
      outcomeText: "Fact-checking together turns a scary experience into a detective game. Your child learns how to look for credible sources, understand bias, and realizes that anyone can make a scary-looking video with a computer.",
      expertOpinion: "Co-viewing and active search are core pillars of digital literacy. Engaging in collaborative fact-checking teaches children information verification skills that persist into adulthood (Hobbs, 2010)."
    }
  },
  {
    id: 4,
    title: "Scene 4: Behavior Modeling (Aggressive Streamers)",
    category: "Behavior Modeling",
    introVideoUrl: "https://youtu.be/e59jfmxm-Gk",
    questionText: "You notice your child is starting to use aggressive language, screaming at their toys, and mimicking the hyper-reactive, angry behavior of their favorite gaming streamer. What do you do?",
    choiceA: {
      text: "You immediately block that streamer's channel and tell your child: 'He is bad-mannered. You are not allowed to watch him anymore.'",
      videoUrl: "https://youtu.be/oGDWYCc86ZI",
      outcomeText: "Blocking the streamer stops the immediate source, but your child feels angry and defensive of their 'friend'. They don't understand why the behavior that seemed funny and popular is suddenly 'bad-mannered', leading to resentment.",
      expertOpinion: "Parasocial relationships with creators are powerful. Abruptly cutting off a favorite creator without discussion can feel like a personal loss and breeds resistance, often leading children to watch them secretly (Giles, 2002)."
    },
    choiceB: {
      text: "You watch a video of the streamer together, discuss why the streamer acts so angry (for views/money), and set healthy boundaries on behavior.",
      videoUrl: "https://youtu.be/UuePWPKLE_A",
      outcomeText: "Discussing the streamer's 'performance' helps your child separate the entertainer from real-world behavior. They realize the anger is an act designed to make money, and they agree that screaming at others in real life isn't cool.",
      expertOpinion: "Media literacy includes understanding the economic incentives of content creation. Explaining that 'anger equals clicks' demystifies the behavior and helps children deconstruct the modeled aggression (Bandura's Social Cognitive Theory)."
    }
  },
  {
    id: 5,
    title: "Scene 5: Inappropriate Content (Sneaky Age-Restricted Content)",
    category: "Inappropriate Content",
    introVideoUrl: "https://youtu.be/aiczVui4BC4",
    questionText: "Your child accidentally clicks on an innocent-looking cartoon thumbnail that actually contains highly inappropriate, age-restricted themes and scary imagery. They look shocked and guilty. What is your reaction?",
    choiceA: {
      text: "You scold them for clicking on it, grab the phone, and lock it with a strict parental control pin.",
      videoUrl: "https://youtu.be/Zo5GlxYlL5Y",
      outcomeText: "Scolding your child makes them feel intense guilt and shame for an accident. They learn that clicking on the wrong thing leads to anger and loss of privileges, so they will go to great lengths to hide any future accidents from you.",
      expertOpinion: "Punishing accidental exposure is highly counterproductive. It instills shame and fear of communication. The American Academy of Pediatrics stresses that open, non-judgmental communication is vital for digital safety (AAP, 2016)."
    },
    choiceB: {
      text: "You comfort them, explain that it was an accident caused by sneaky design, and show them how to flag/report the video together.",
      videoUrl: "https://youtu.be/6ds7h9oDahA",
      outcomeText: "By comforting them and flagging the video, you turn a scary accident into an act of digital citizenship. Your child feels relieved, understands they aren't in trouble, and learns how to actively protect themselves and others online.",
      expertOpinion: "Teaching children to report inappropriate content fosters agency and digital citizenship. It reframes the child from a helpless victim of bad content to an active participant in keeping the internet safer (Jones & Mitchell, 2016)."
    }
  },
  {
    id: 6,
    title: "Scene 6: Parasocial Relationships (Virtual Friend Confusion)",
    category: "Relationship Confusion",
    introVideoUrl: "https://youtu.be/_967sPcn8TM",
    questionText: "Your child insists on buying expensive merchandise from a streamer because they genuinely believe the streamer is their 'best friend' who talks directly to them. How do you address this?",
    choiceA: {
      text: "You tell them bluntly: 'That streamer doesn't know you exist. They just want our money. No merchandise.'",
      videoUrl: "https://youtu.be/4JVjPudHWwU",
      outcomeText: "The blunt truth feels like a harsh rejection. Your child feels embarrassed, misunderstood, and defensive. They still feel the connection to the streamer but now feel they have to hide their enthusiasm from you.",
      expertOpinion: "While factually true, breaking a parasocial bond with brute force ignores the child's genuine emotional investment. It can damage the parent-child relationship and reduce the child's willingness to share their digital interests (Horton & Wohl, 1956)."
    },
    choiceB: {
      text: "You acknowledge their excitement, but gently explain how broadcasting works (one-to-many) and suggest supporting them in other free ways.",
      videoUrl: "https://youtu.be/DfYLWdq2J2c",
      outcomeText: "By validating their feelings first, you keep the door open. Explaining the 'one-to-many' broadcast model helps them understand the streamer's business without feeling foolish. They feel supported and understand the financial boundary.",
      expertOpinion: "Gently deconstructing parasocial interactions by explaining the medium's structure helps children build healthy boundaries. It respects their emotional world while developing critical commercial and media literacy (Hoffner, 2008)."
    }
  }
];
