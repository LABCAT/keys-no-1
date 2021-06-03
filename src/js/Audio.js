import React, { useRef, useContext, useEffect } from "react";
import "./helpers/Globals";
import "p5/lib/addons/p5.sound";
import * as p5 from "p5";
import audio from "../audio/ki-no-1.ogg";
import cueSet1 from "./cueSets/cueSet1.js";
import NewtonsColourMapper from "./functions/NewtonsColourMapper.js";
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

    p.preload = () => {
      p.song = p.loadSound(audio);
    };

    p.setup = () => {
      p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
      p.canvas.id("audio-controller");
      p.noLoop();
      for (let i = 0; i < cueSet1.length; i++) {
        let vars = {
          currentCue: i + 1,
          duration: cueSet1[i].duration,
          midi: cueSet1[i].midi,
          time: cueSet1[i].time,
        };
        p.song.addCue(cueSet1[i].time, p.executeCueSet1, vars);
      }
    };

    p.draw = () => {};

    p.executeCueSet1 = (vars) => {
      const currentCue = vars.currentCue;
      if (!p.cueSet1Completed.includes(currentCue)) {
        p.cueSet1Completed.push(currentCue);
        const colour = NewtonsColourMapper(vars.midi);
        let root = document.documentElement;
        root.style.setProperty("--bottom-grad-color", colour);
        updateNotes(colour);
      }
    };

    p.mousePressed = () => {
      if (p.song.isPlaying()) {
        p.song.pause();
      } else {
        if (
          parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)
        ) {
          p.reset();
        }
        //document.getElementById("play-icon").classList.add("fade-out");
        p.canvas.addClass("fade-in");
        p.song.play();
      }
    };
  };

  useEffect(() => {
    new p5(Sketch, sketchRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={sketchRef}></div>;
};

export default Audio;
