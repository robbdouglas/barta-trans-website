import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const milestones = [
  { key: 1, date: "September 2021", title: "Foundation", description: "Barta Trans s.r.o. is founded.", icon: "work" },
  { key: 2, date: "2021-2022", title: "Team Building", description: "Shortly after founding: A reliable and experienced team is built.", icon: "work" },
  { key: 3, date: "2022", title: "Domestic Transport", description: "Establishment of an extensive network for domestic transport.", icon: "work" },
  { key: 4, date: "2023", title: "International Transport", description: "Commencement of international transport services.", icon: "work" },
  { key: 5, date: "2023", title: "Water and Air Freight", description: "Partnerships established to provide water and air freight solutions.", icon: "work" },
  { key: 6, date: "Future Plans", title: "Warehouse Services", description: "Development of a modern and efficient warehouse infrastructure is planned.", icon: "work" },
  { key: 7, date: "Vision", title: "Vision", description: "Striving to become a pioneer in the transport and logistics industry.", icon: "work" }
];

const workIconStyles = { background: "#06D6A0" }; // Icon background color

const MilestonesContainer = styled.div`
  width: 100%;
  background-color: #000; // Background color of the timeline container
  color: #32cd32; // Default text color
  padding: 20px;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;

  .vertical-timeline-element-content {
    box-shadow: 0 0.25em 0.5em 0 rgba(0, 0, 0, 0.25), 0 0.4em 1.25em 0 rgba(0, 0, 0, 0.15); // Shadow for timeline elements
  }

  .vertical-timeline-element-date {
    display: block !important;
    float: none !important;
    color: #ff6347; /* Color for the dates */
    margin-top: 1.5em;
  }

  .vertical-timeline-element-title {
    color: #ffd700; /* Color for the milestone titles */
  }
`;

const Title = styled.h1`
  font-size: 3em;
  text-align: center;
  font-family: "Bebas Neue", sans-serif;
  color: #32CD32; // Color for the main title
`;

const Description = styled.p`
  margin: 1.5em 0 2em 0;
`;

const Milestones: React.FC = () => {
  const timelineElementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: [0.5],
      }
    );

    if (timelineElementsRef.current) {
      timelineElementsRef.current.forEach((element) => {
        if (element) {
          observer.observe(element);
        }
      });
    }

    return () => {
      if (timelineElementsRef.current) {
        timelineElementsRef.current.forEach((element) => {
          if (element) {
            observer.unobserve(element);
          }
        });
      }
    };
  }, []);

  return (
    <MilestonesContainer>
      <Title>Timeline of Barta Trans s.r.o.</Title>
      <VerticalTimeline>
        {milestones.map((milestone, index) => (
          <VerticalTimelineElement
            key={milestone.key}
            date={milestone.date}
            dateClassName="vertical-timeline-element-date"
            iconStyle={workIconStyles}
            ref={(el: HTMLDivElement) => (timelineElementsRef.current[index] = el)}
          >
            <h3 className="vertical-timeline-element-title">{milestone.title}</h3>
            <Description>{milestone.description}</Description>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </MilestonesContainer>
  );
};

export default Milestones;
