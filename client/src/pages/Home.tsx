import { useState, useEffect } from "react";
import { 
  Shield, 
  ChevronRight, 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  GraduationCap, 
  Play, 
  Home as HomeIcon,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SCENES, Scene, Choice } from "../const";
import { motion, AnimatePresence } from "framer-motion";

type AppState = "MENU" | "INTRO_VIDEO" | "QUESTION" | "OUTCOME_VIDEO" | "OUTCOME_TEXT" | "EXPERT_OPINION";

export default function Home() {
  const [state, setState] = useState<AppState>("MENU");
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<"A" | "B" | null>(null);
  const [completedScenes, setCompletedScenes] = useState<Record<number, "A" | "B">>(() => {
    const saved = localStorage.getItem("saferkid_completed_scenes");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("saferkid_completed_scenes", JSON.stringify(completedScenes));
  }, [completedScenes]);

  const startScene = (scene: Scene) => {
    setSelectedScene(scene);
    setSelectedChoice(null);
    setState("INTRO_VIDEO");
  };

  const handleChoice = (choice: "A" | "B") => {
    setSelectedChoice(choice);
    setState("OUTCOME_VIDEO");
  };

  const finishOutcomeVideo = () => {
    setState("OUTCOME_TEXT");
  };

  const toggleExpertOpinion = () => {
    setState("EXPERT_OPINION");
  };

  const markSceneComplete = (choice: "A" | "B" | null) => {
    if (selectedScene && choice) {
      setCompletedScenes(prev => ({
        ...prev,
        [selectedScene.id]: choice
      }));
    }
    resetToMenu();
  };

  const resetToMenu = () => {
    setSelectedScene(null);
    setSelectedChoice(null);
    setState("MENU");
  };

  const getChoiceData = (): Choice | null => {
    if (!selectedScene || !selectedChoice) return null;
    return selectedChoice === "A" ? selectedScene.choiceA : selectedScene.choiceB;
  };

  const getEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0` : url;
  };

  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } as any },
    exit: { opacity: 0, y: -15, transition: { duration: 0.15, ease: "easeIn" } as any }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="max-w-4xl mx-auto w-full mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-3 border border-primary/20">
          <Shield className="w-4 h-4" />
          <span>Deliverable 2.5 • Simulator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">
          SaferKid Parental Mediation Simulator
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
          Practice and understand different digital mediation strategies to protect and empower children in the modern media landscape.
        </p>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {/* 1. MAIN MENU */}
          {state === "MENU" && (
            <motion.div 
              key="menu" 
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-8"
            >
              {/* Welcome Card with Intro Graphic */}
              <div className="neo-flat p-6 sm:p-8 rounded-[2rem] space-y-6 text-center sm:text-left flex flex-col items-center">
                <img 
                  src="./StartScreen2.jpg" 
                  alt="SaferKid Tool - Simulator Intro Graphic" 
                  className="w-full max-w-[500px] aspect-[5/3] object-cover rounded-2xl shadow-md border border-border/50"
                />
                <div className="flex flex-col sm:flex-row items-center gap-5 pt-4">
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary shrink-0">
                    <Shield className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold">How does the simulator work?</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Browse through 6 realistic scenarios of common "digital risks" in childhood. For each scenario, you will watch an introductory video and choose between two parental mediation strategies. After each choice, analyze the outcomes of your decisions through the lens of developmental psychology and digital media experts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Scenarios Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SCENES.map((scene) => {
                  const completion = completedScenes[scene.id];
                  return (
                    <div 
                      key={scene.id}
                      onClick={() => startScene(scene)}
                      className={`neo-button p-6 rounded-[2rem] text-left cursor-pointer transition-all duration-300 border border-transparent hover:border-primary/20 flex flex-col justify-between group h-full relative ${
                        completion ? "bg-emerald-50/50 dark:bg-emerald-950/10" : ""
                      }`}
                    >
                      {completion && (
                        <div className="absolute top-4 right-4 flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 px-2.5 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completed (Approach {completion})
                        </div>
                      )}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
                            {scene.category}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                            {scene.title}
                          </h3>
                          <p className="text-muted-foreground text-xs mt-1 line-clamp-2">
                            {scene.questionText}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50 text-xs font-bold text-primary">
                        <span>Start Scenario</span>
                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Academic Footer */}
              <div className="text-center text-xs text-muted-foreground pt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
                <span><strong>Wagner Santos</strong> • University of Niagara Falls Canada</span>
                <span className="hidden sm:inline">•</span>
                <span>Assignment 2.5 (Parental Simulator)</span>
              </div>

              {/* User Perception Survey Neomorphic Card */}
              <div className="neo-flat p-6 sm:p-8 rounded-[2rem] space-y-6 border border-primary/10 bg-primary/5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-3 text-center md:text-left flex-1">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                      Feedback & Evaluation
                    </span>
                    <h3 className="text-xl font-bold text-foreground">User Perception Survey</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                      Your feedback is highly valuable for this academic research. Please take a moment to evaluate the simulator. You can click on the link below or capture the QR Code with your mobile device to access the survey.
                    </p>
                    <div className="pt-2">
                      <a 
                        href="https://forms.cloud.microsoft/pages/responsepage.aspx?id=Qyxi9WSOY0iu1AzEkI08iJqvKOdMgmBFl64DO74jcDNUNTZEVjVQMDUxMDlZTDRFV0JLOUdHUkUwUi4u&route=shorturl" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors shadow-md"
                      >
                        Take User Perception Survey <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <div className="shrink-0 p-3 bg-white rounded-2xl border border-border/50 shadow-inner flex flex-col items-center gap-2">
                    <img 
                      src="./qr-code.svg" 
                      alt="User Perception Survey QR Code" 
                      className="w-32 h-32 md:w-36 md:h-32 object-contain"
                    />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Scan QR Code</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. INTRODUCTORY VIDEO */}
          {state === "INTRO_VIDEO" && selectedScene && (
            <motion.div 
              key="intro-video" 
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={resetToMenu} className="rounded-full gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back to Menu
                </Button>
                <span className="text-sm font-bold text-muted-foreground">Scenario {selectedScene.id} of 6</span>
              </div>

              <div className="neo-flat p-4 rounded-[2rem] space-y-4">
                <div className="relative aspect-square w-full max-w-[500px] mx-auto overflow-hidden rounded-[1.5rem] bg-black shadow-inner">
                  <iframe
                    src={getEmbedUrl(selectedScene.introVideoUrl)}
                    title="Intro Video"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="text-center space-y-2 max-w-xl mx-auto">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
                    Scenario Introduction
                  </span>
                  <h2 className="text-xl font-bold">{selectedScene.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Watch the situation above. When you want, click the button below to see an explanation of the scene and make your parental mediation decision.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <Button 
                  onClick={() => setState("QUESTION")} 
                  className="neo-button rounded-full px-8 py-6 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Understand this scene <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* 3. DECISION SCREEN / QUESTION */}
          {state === "QUESTION" && selectedScene && (
            <motion.div 
              key="question" 
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => setState("INTRO_VIDEO")} className="rounded-full gap-2">
                  <ArrowLeft className="w-4 h-4" /> Watch Video Again
                </Button>
                <span className="text-sm font-bold text-muted-foreground">{selectedScene.category}</span>
              </div>

              <div className="neo-flat p-6 sm:p-8 rounded-[2rem] space-y-6 text-center">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary w-fit mx-auto">
                  <Shield className="w-8 h-8" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold max-w-2xl mx-auto leading-snug">
                    {selectedScene.questionText}
                  </h2>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Choose one of the approaches below to see how your child reacts.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {/* Option A: Restrictive */}
                  <button 
                    onClick={() => handleChoice("A")}
                    className="neo-button p-6 rounded-[1.8rem] text-left border-t-4 border-t-destructive hover:border-t-destructive/80 flex flex-col justify-between h-full space-y-4 group"
                  >
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-destructive px-2 py-0.5 rounded-md bg-destructive/10">
                        Approach A
                      </span>
                      <h3 className="text-base group-hover:text-destructive transition-colors">
                        Restrictive Action
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {selectedScene.choiceA.text}
                      </p>
                    </div>
                    <div className="text-xs font-bold text-destructive flex items-center gap-1 pt-2">
                      <span>Choose this option</span>
                      <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>

                  {/* Option B: Active */}
                  <button 
                    onClick={() => handleChoice("B")}
                    className="neo-button p-6 rounded-[1.8rem] text-left border-t-4 border-t-primary hover:border-t-primary/80 flex flex-col justify-between h-full space-y-4 group"
                  >
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary px-2 py-0.5 rounded-md bg-primary/10">
                        Approach B
                      </span>
                      <h3 className="text-base group-hover:text-primary transition-colors">
                        Active Mediation
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {selectedScene.choiceB.text}
                      </p>
                    </div>
                    <div className="text-xs font-bold text-primary flex items-center gap-1 pt-2">
                      <span>Choose this option</span>
                      <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 4. OUTCOME VIDEO */}
          {state === "OUTCOME_VIDEO" && selectedScene && selectedChoice && (
            <motion.div 
              key="outcome-video" 
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => setState("QUESTION")} className="rounded-full gap-2">
                  <ArrowLeft className="w-4 h-4" /> Change Choice
                </Button>
                <span className={`text-sm font-bold ${selectedChoice === "B" ? "text-primary" : "text-destructive"}`}>
                  {selectedChoice === "B" ? "Active Mediation" : "Restrictive Action"}
                </span>
              </div>

              <div className="neo-flat p-4 rounded-[2rem] space-y-4">
                <div className="relative aspect-square w-full max-w-[500px] mx-auto overflow-hidden rounded-[1.5rem] bg-black shadow-inner">
                  <iframe
                    src={getEmbedUrl(getChoiceData()?.videoUrl || "")}
                    title="Outcome Video"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="text-center space-y-2 max-w-xl mx-auto">
                  <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    selectedChoice === "B" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                  }`}>
                    Consequence Video
                  </span>
                  <h2 className="text-xl font-bold">See your child's reaction</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Observe the child's behavior and emotions following your decision. Then, proceed to read the detailed pedagogical analysis.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <Button 
                  onClick={finishOutcomeVideo} 
                  className="neo-button rounded-full px-8 py-6 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Analyze Outcome <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* 5. OUTCOME TEXT */}
          {state === "OUTCOME_TEXT" && selectedScene && selectedChoice && (
            <motion.div 
              key="outcome-text" 
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => setState("OUTCOME_VIDEO")} className="rounded-full gap-2">
                  <ArrowLeft className="w-4 h-4" /> Replay Outcome Video
                </Button>
                <span className={`text-sm font-bold ${selectedChoice === "B" ? "text-primary" : "text-destructive"}`}>
                  {selectedChoice === "B" ? "Active Mediation" : "Restrictive Action"}
                </span>
              </div>

              <div className="neo-flat p-6 sm:p-8 rounded-[2rem] space-y-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl shrink-0 ${
                    selectedChoice === "B" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"
                  }`}>
                    {selectedChoice === "B" ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Decision Outcome</span>
                    <h2 className="text-lg sm:text-xl font-bold">
                      {selectedChoice === "B" ? "Effect of Active Parental Mediation" : "Effect of Restrictive Approach"}
                    </h2>
                  </div>
                </div>

                <blockquote className="neo-inset p-5 rounded-2xl text-sm sm:text-base leading-relaxed italic text-foreground/90 border-l-4 border-l-primary">
                  "{getChoiceData()?.outcomeText}"
                </blockquote>

                <div className="p-4 rounded-2xl bg-secondary/30 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-foreground flex items-center gap-1">
                    <Info className="w-3.5 h-3.5" /> Pedagogical Reflection
                  </h4>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {selectedChoice === "B" 
                      ? "Active mediation builds open and long-lasting communication channels. Although it requires more time and patience, it cognitively equips the child to handle future online challenges autonomously."
                      : "Immediate and severe restriction (without dialogue) resolves the issue superficially and instantly, but creates communication barriers. The child learns to hide their online experiences out of fear of punishment."
                    }
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button 
                    onClick={toggleExpertOpinion} 
                    className="neo-button flex-1 rounded-full py-6 font-bold bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                  >
                    <BookOpen className="w-5 h-5" /> View Experts' Opinion
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => markSceneComplete(selectedChoice)} 
                    className="neo-button flex-1 rounded-full py-6 font-bold border-border bg-card text-foreground hover:bg-accent/10 gap-2"
                  >
                    <HomeIcon className="w-5 h-5" /> Complete & Back to Menu
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 6. EXPERTS' OPINION */}
          {state === "EXPERT_OPINION" && selectedScene && selectedChoice && (
            <motion.div 
              key="expert-opinion" 
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => setState("OUTCOME_TEXT")} className="rounded-full gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back to Outcome
                </Button>
                <span className="text-sm font-bold text-muted-foreground">Scientific Reference</span>
              </div>

              <div className="neo-flat p-6 sm:p-8 rounded-[2rem] space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold">What does Science and Literature say?</h2>
                  </div>
                </div>

                <div className="neo-inset p-5 rounded-2xl space-y-4">
                  <p className="text-foreground text-sm sm:text-base leading-relaxed">
                    {getChoiceData()?.expertOpinion}
                  </p>
                  <div className="p-3.5 rounded-xl bg-primary/5 text-primary text-xs leading-relaxed border border-primary/10">
                    <strong>Theoretical Foundation:</strong> Each scenario was modeled on the Canadian Paediatric Society's (2019) guidelines and empirical research on active versus restrictive parental mediation (Helsper et al., 2024).
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button 
                    onClick={() => markSceneComplete(selectedChoice)} 
                    className="neo-button flex-1 rounded-full py-6 font-bold bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" /> Complete Scenario
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setState("OUTCOME_TEXT")} 
                    className="neo-button flex-1 rounded-full py-6 font-bold border-border bg-card text-foreground hover:bg-accent/10 gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" /> Replay Outcome
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* General App Footer */}
      <footer className="max-w-4xl mx-auto w-full mt-8 pt-6 border-t border-border/30 text-center space-y-2 text-xs text-muted-foreground">
        <p>
          <strong>SaferKid Parental Mediation Simulator</strong> © 2026. All rights reserved.
        </p>
        <p className="flex items-center justify-center gap-2">
          <a 
            href="https://sites.google.com/view/saferkidtool" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline font-semibold inline-flex items-center gap-1"
          >
            Back to SaferKid Tool website <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </p>
        <p>
          No commercial use intended.
        </p>
      </footer>
    </div>
  );
}
