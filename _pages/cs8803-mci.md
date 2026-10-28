---
permalink: /projects/cs8803-mci/
title: "CS8803 MCI – Human Egocentric Manipulation Data Collection and Retrieval System"
author_profile: true
---

<p class="project-back"><a href="/projects/">← All projects</a></p>

## Overview

<figure class="project-fig">
  <img src="/images/mci-overview.png" alt="CS8803 MCI project overview">
</figure>

## Motivation

With today's IoT ecosystem—webcams in homes, wearable smart glasses in the future, and IMUs in everyday devices like smartwatches—we are surrounded by sensors that constantly capture human movements. If we can turn these sensors into a unified data-collection system, then we can unlock a massive amount of natural, real-world manipulation data for robots to learn from.

<figure class="project-fig">
  <img src="/images/mci-1.gif" alt="Motivation: IoT sensors capturing human movements">
</figure>

## System Design

We need a system that can identify and retrieve only the meaningful manipulation moments without continuous heavy processing. That idea shaped the direction of this project—designing an efficient, scalable way to pull useful human-manipulation data out of the vast streams of everyday recordings.

<figure class="project-fig">
  <img src="/images/mci-2.gif" alt="System design for efficient data retrieval">
</figure>

## Data Collection

We collected and built a large-scale multimodal human manipulation dataset designed for studying motion understanding and cross-modal retrieval between vision and inertial sensing. It contains **23 daily manipulation tasks** with a total of **496 recorded trajectories**, collected from **8 different participants**. The full dataset size is approximately **48.55 GB**.

<figure class="project-fig">
  <img src="/images/mci-3.gif" alt="Data collection process">
</figure>

Each trajectory consists of synchronized RGB video and 9-DoF IMU data, including accelerometer, gyroscope, and magnetometer signals. The IMU is worn on the wrist, enabling fine-grained capture of hand and arm motion aligned with first-person or third-person visual observations.

<figure class="project-fig">
  <img src="/images/mci-4.gif" alt="Synchronized RGB video and IMU data">
</figure>

## Method

We tried two different routes:

1. **Reproduce IMU2CLIP and extend it via feature engineering**
2. **Design a self-supervised learning pipeline from scratch**

<figure class="project-fig">
  <img src="/images/mci-5.gif" alt="Method comparison: feature engineering vs self-supervised learning">
</figure>

## Results

For our feature engineering approach, we achieved the best retrieval results on the test set. Our self-supervised learning approach achieves comparable results to the baseline method IMU2CLIP.

<figure class="project-fig project-fig--wide">
  <img src="/images/mci-results.png" alt="Results: feature engineering vs self-supervised learning">
</figure>
