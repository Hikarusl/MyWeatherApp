import './ForecastDiagram.scss'
import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function ForecastDiagram({ className, hourlyData }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!hourlyData || hourlyData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600;   // виртуальная ширина
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 30, left: 30 };

    // шкалы
    const x = d3.scalePoint()
      .domain(hourlyData.map(d => d.time))
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([
        d3.min(hourlyData, d => d.temperature) - 1,
        d3.max(hourlyData, d => d.temperature) + 1,
      ])
      .range([height - margin.bottom, margin.top]);

    // линия и область
    const line = d3.line()
      .x(d => x(d.time))
      .y(d => y(d.temperature))
      .curve(d3.curveMonotoneX);

    const area = d3.area()
      .x(d => x(d.time))
      .y0(height - margin.bottom)
      .y1(d => y(d.temperature))
      .curve(d3.curveMonotoneX);

    // градиент
    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
      .attr("id", "area-gradient")
      .attr("x1", "0%").attr("y1", "0%")
      .attr("x2", "0%").attr("y2", "100%");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#696b9b").attr("stop-opacity", 0.7);
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#696b9b").attr("stop-opacity", 0);

    const g = svg.append("g");

    // область
    g.append("path")
      .datum(hourlyData)
      .attr("class", "area")
      .attr("d", area)
      .style("fill", "url(#area-gradient)");

    // линия
    g.append("path")
      .datum(hourlyData)
      .attr("class", "line")
      .attr("d", line);

    // подписи температуры
    g.selectAll(".temp-label")
      .data(hourlyData)
      .enter()
      .append("text")
      .attr("class", "temp-label")
      .attr("x", d => x(d.time))
      .attr("y", d => y(d.temperature) - 10)
      .text(d => `${d.temperature}°`);

    // ось X
    g.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3.axisBottom(x)
          .tickValues(hourlyData.map(d => d.time))
          .tickSize(0)
      )
      .selectAll("text")
      .attr("fill", "#696b9b")
      .style("font-size", "13px");

    g.select(".domain").remove();


  }, [hourlyData]);

  return (
    <div className={`diagram ${className}`}>
      <h4 className="diagram__title">Температура в течение дня</h4>
      <svg
        ref={svgRef}
        className="diagram__image"
        viewBox="0 0 600 250"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}
