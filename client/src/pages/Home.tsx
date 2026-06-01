import React, { useState, useEffect, useRef } from "react";
import { SCENES, Scene, Choice } from "@/const";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  RotateCcw, 
  Home as HomeIcon, 
  ChevronRight, 
  Shield, 
  Info,
  ExternalLink,
  GraduationCap
} from "lucide-react";

// Helper to convert short YouTube URLs (youtu.be/ID) to embed format (youtube.com/embed/ID)
const getEmbedUrl = (url: string): string => {
  if (!url) return "";
  let id = "";
  if (url.includes("youtu.be/")) {
    id = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("youtube.com/watch?v=")) {
    id = url.split("watch?v=")[1].split("&")[0];
  } else if (url.includes("youtube.com/embed/")) {
    id = url.split("embed/")[1].split("?")[0];
  } else {
    id = url; // assume it's already the ID
  }
  return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
};

type AppState = "MENU" | "INTRO_VIDEO" | "QUESTION" | "OUTCOME_VIDEO" | "OUTCOME_TEXT" | "EXPERT_OPINION";

export default function Home() {
  const [state, setState] = useState<AppState>("MENU");
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<"A" | "B" | null>(null);
  const [showExpertInOutcome, setShowExpertInOutcome] = useState<boolean>(false);
  const [completedScenes, setCompletedScenes] = useState<Record<number, "A" | "B">>(() => {
    const saved = localStorage.getItem("saferkid_completed_scenes");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("saferkid_completed_scenes", JSON.stringify(completedScenes));
  }, [completedScenes]);

  const selectScene = (scene: Scene) => {
    setSelectedScene(scene);
    setSelectedChoice(null);
    setShowExpertInOutcome(false);
    setState("INTRO_VIDEO");
  };

  const handleChoice = (choiceType: "A" | "B") => {
    setSelectedChoice(choiceType);
    setState("OUTCOME_VIDEO");
  };

  const finishOutcomeVideo = () => {
    setState("OUTCOME_TEXT");
  };

  const toggleExpertOpinion = () => {
    setState("EXPERT_OPINION");
  };

  const markSceneComplete = (choice: "A" | "B") => {
    if (selectedScene) {
      setCompletedScenes(prev => ({
        ...prev,
        [selectedScene.id]: choice
      }));
    }
    resetToMenu();
  };

  const resetToMenu = () => {
    setState("MENU");
    setSelectedScene(null);
    setSelectedChoice(null);
    setShowExpertInOutcome(false);
  };

  const getChoiceData = (): Choice | null => {
    if (!selectedScene || !selectedChoice) return null;
    return selectedChoice === "A" ? selectedScene.choiceA : selectedScene.choiceB;
  };

  // Animations
  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 }
  };

  return (
    <div className="min-h-screen flex flex-col py-8 px-4 sm:px-6 lg:px-8">
      {/* Simulator Header */}
      <header className="max-w-4xl mx-auto w-full mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-3 border border-primary/20">
          <Shield className="w-4 h-4" />
          <span>Assignment 2.5 • Academic Deliverable</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">
          SaferKid Parental Mediation Simulator
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
          An interactive tool for parents to practice digital mediation strategies. Experience branching scenarios, compare Restrictive vs. Active mediation, and read expert pedagogical opinions.
        </p>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto w-full flex-grow flex flex-col justify-center">
        <AnimatePresence mode="wait">
          
          {/* 1. MAIN MENU */}
          {state === "MENU" && (
            <motion.div 
              key="menu" 
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              {/* Welcome Card */}
              <div className="neo-flat p-6 rounded-[2rem] space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary shrink-0">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-1">How does the simulator work?</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Navigate through <strong>6 realistic scenarios of common digital risks</strong> in childhood. 
                      For each scenario, you will watch an introductory video and choose between two parental mediation strategies: 
                      <span className="text-destructive font-semibold"> Choice A (Restrictive Approach)</span> or 
                      <span className="text-primary font-semibold"> Choice B (Active Parental Mediation)</span>. 
                      Analyze the outcomes of your decisions through the lens of developmental psychology and digital media experts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Scenarios Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SCENES.map((scene) => {
                  const completedChoice = completedScenes[scene.id];
                  return (
                    <div 
                      key={scene.id}
                      onClick={() => selectScene(scene)}
                      className="neo-button p-5 rounded-[1.8rem] cursor-pointer flex flex-col justify-between h-full group"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
                            {scene.category}
                          </span>
                          {completedChoice && (
                            <span className={`text-xs font-bold flex items-center gap-1 px-2.5 py-1 rounded-full ${
                              completedChoice === "B" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"
                            }`}>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {completedChoice === "B" ? "Active" : "Restrictive"}
                            </span>
                          )}
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
                <span><strong>Wagner</strong> • Master of Arts Candidate (UNF)</span>
                <span className="hidden sm:inline">•</span>
                <span>Assignment 2.5: Parental Simulator</span>
                <span className="hidden sm:inline">•</span>
                <a 
                  href="https://sites.google.com/view/saferkidtool" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Website Hub (Assignment 2.6) <ExternalLink className="w-3 h-3" />
                </a>
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
                    Watch the situation above. When the video ends (or at any time), click the button below to make your parental mediation decision.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <Button 
                  onClick={() => setState("QUESTION")} 
                  className="neo-button rounded-full px-8 py-6 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Make Your Choice <ChevronRight className="ml-2 w-5 h-5" />
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
                      <h3 className="text-base font-bold group-hover:text-destructive transition-colors">
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
                      <h3 className="text-base font-bold group-hover:text-primary transition-colors">
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
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Academic Analysis</span>
                    <h2 className="text-lg sm:text-xl font-bold">What does Science and Literature say?</h2>
                  </div>
                </div>

                <div className="neo-inset p-5 rounded-2xl space-y-4">
                  <p className="text-foreground text-sm sm:text-base leading-relaxed">
                    {getChoiceData()?.expertOpinion}
                  </p>
                  <div className="p-3.5 rounded-xl bg-primary/5 text-primary text-xs leading-relaxed border border-primary/10">
                    <strong>Theoretical Foundation:</strong> This scenario was modeled based on guidelines from the 
                    <em> American Academy of Pediatrics (AAP)</em> and consolidated parental mediation studies 
                    (such as Livingstone & Helsper, 2008; Radesky et al., 2016).
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
        <p>
          Developed as the academic deliverable <strong>Assignment 2.5</strong> for the Master of Arts Program at the 
          <a href="https://unf.ca" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
            University of Niagara Falls (UNF)
          </a>.
        </p>
      </footer>
    </div>
  );
}
