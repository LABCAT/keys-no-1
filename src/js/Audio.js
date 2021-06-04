import React, { useRef, useContext, useEffect } from "react";
import "./helpers/Globals";
import "p5/lib/addons/p5.sound";
import * as p5 from "p5";
import audio from "../audio/ki-no-1.ogg";
import cueSet1 from "./cueSets/cueSet1.js";
import cueSet2 from "./cueSets/cueSet2.js";
import cueSet3 from "./cueSets/cueSet3.js";
import NewtonsColourMapper from "./functions/NewtonsColourMapper.js";
import PauseIcon from "./icons/PauseIcon.js";
import PlayIcon from "./icons/PlayIcon.js";
import { Context } from "./context/Context.js";

const Audio = () => {
  const { updateNotes } = useContext(Context);
  const sketchRef = useRef();

  const Sketch = (p) => {
    p.canvas = null;

    p.song = null;

    p.canvasWidth = window.innerWidth;

    p.canvasHeight = window.innerHeight;

    p.cueSet1Completed = [];
    
    p.cueSet2Completed = [];

    p.cueSet3Completed = [];

    p.preload = () => {
      p.song = p.loadSound(audio);
    };

    p.setup = () => {
      p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
      p.canvas.id("audio-controller");
      p.noLoop();
      if(p.song){
        p.addCues();
      }
    };

    p.cuesAdded = false;

    p.addCues = () => {
      if(!p.cuesAdded){
        for (let i = 0; i < cueSet1.length; i++) {
          let vars = {
            currentCue: i + 1,
            duration: cueSet1[i].duration,
            midi: cueSet1[i].midi,
            time: cueSet1[i].time,
          };
          p.song.addCue(cueSet1[i].time, p.executeCueSet1, vars);
        }
        for (let i = 0; i < cueSet2.length; i++) {
          let vars = {
            currentCue: i + 1,
            duration: cueSet2[i].duration,
            midi: cueSet2[i].midi,
            time: cueSet2[i].time,
          };
          p.song.addCue(cueSet2[i].time, p.executeCueSet2, vars);
        }
        for (let i = 0; i < cueSet3.length; i++) {
          let vars = {
            currentCue: i + 1,
            duration: cueSet3[i].duration,
            midi: cueSet3[i].midi,
            time: cueSet3[i].time,
          };
          p.song.addCue(cueSet3[i].time, p.executeCueSet3, vars);
        }
        p.cuesAdded = true;
      }
    }

    p.draw = () => {};

    p.executeCueSet1 = (vars) => {
      const currentCue = vars.currentCue;
      if (!p.cueSet1Completed.includes(currentCue)) {
        p.cueSet1Completed.push(currentCue);
        const colour = NewtonsColourMapper(vars.midi);
        const xPos = p.map(vars.midi, 21, 108, -1.25, 1.25);
        updateNotes({
          colour: colour,
          xPos: xPos
        });
      }
    };

    p.executeCueSet2 = (vars) => {
      const currentCue = vars.currentCue;
      if (!p.cueSet2Completed.includes(currentCue)) {
        p.cueSet2Completed.push(currentCue);
        const colour = NewtonsColourMapper(vars.midi);
        const root = document.documentElement;
        root.style.setProperty("--top-grad-color", colour);
      }
    };

    p.executeCueSet3 = (vars) => {
      const currentCue = vars.currentCue;
      if (!p.cueSet3Completed.includes(currentCue)) {
        p.cueSet3Completed.push(currentCue);
        const colour = NewtonsColourMapper(vars.midi);
        const root = document.documentElement;
      }
    };

    p.mousePressed = () => {
      if (p.song.isPlaying()) {
        p.song.pause();
        document.getElementById("play-icon").classList.remove("fade-out");
        document.getElementById("pause-icon").classList.remove("fade-in");
      } else {
        if (
          parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)
        ) {
          p.reset();
        }
        document.getElementById("audio-controller").classList.add("loaded");
        document.getElementById("play-icon").classList.add("fade-out");
        document.getElementById("pause-icon").classList.add("fade-in");
        document.getElementById("play-icon").classList.add("loaded");
        p.addCues();
        p.song.play();
      }
    };
  };

  useEffect(() => {
    new p5(Sketch, sketchRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={sketchRef}>
      <PauseIcon/>
      <PlayIcon/>
    </div>
  );
};

export default Audio;
