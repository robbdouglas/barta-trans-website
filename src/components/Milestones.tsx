import React, { useEffect, useRef, useCallback, forwardRef } from "react";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
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

const workIconStyles = { background: "#06D6A0" };

const MilestonesContainer = styled.div`
  width: 100%;
  background-color: #000;
  color: #32cd32;
  padding: 20px;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;

  .vertical-timeline-element-content {
    box-shadow: 0 0.25em 0.5em 0 rgba(0, 0, 0, 0.25), 0 0.4em 1.25em 0 rgba(0, 0, 0, 0.15);
  }

  .vertical-timeline-element-date {
    display: block !important;
    float: none !important;
    color: #ff6347;
    margin-top: 1.5em;
  }

  .vertical-timeline-element-title {
    color: #ffd700;
  }

  .vertical-timeline-element {
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
  }
`;

const Title = styled.h1`
  font-size: 3em;
  text-align: center;
  font-family: "Bebas Neue", sans-serif;
  color: #32CD32;
`;

const Description = styled.p`
  margin: 1.5em 0 2em 0;
`;

interface VerticalTimelineElementProps {
  key: number;
  date: string;
  dateClassName: string;
  iconStyle: React.CSSProperties;
  children: React.ReactNode;
}

const VerticalTimelineElementWithRef = forwardRef<HTMLDivElement, VerticalTimelineElementProps>((props, ref) => (
  <VerticalTimelineElement innerRef={ref} {...props} />
));

const Milestones: React.FC = () => {
  const { t } = useTranslation();
  const timelineElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  const setRef = useCallback((el: HTMLDivElement | null, index: number) => {
    if (el) {
      timelineElementsRef.current[index] = el;
    }
  }, []);

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

    timelineElementsRef.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      timelineElementsRef.current.forEach((element) => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  return (
    <MilestonesContainer>
      <Title>{t('milestones.title')}</Title>
      <VerticalTimeline>
        {milestones.map((milestone, index) => (
          <VerticalTimelineElementWithRef
            key={milestone.key}
            date={t(`milestones.${milestone.key}.date`)}
            dateClassName="vertical-timeline-element-date"
            iconStyle={workIconStyles}
            ref={(el: HTMLDivElement | null) => setRef(el, index)}
          >
            <h3 className="vertical-timeline-element-title">{t(`milestones.${milestone.key}.title`)}</h3>
            <Description>{t(`milestones.${milestone.key}.description`)}</Description>
          </VerticalTimelineElementWithRef>
        ))}
      </VerticalTimeline>
    </MilestonesContainer>
  );
};

export default React.memo(Milestones);
