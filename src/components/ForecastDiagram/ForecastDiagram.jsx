import './ForecastDiagram.scss'
import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function ForecastDiagram({ className, temps }) {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function drawDiagram() {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // очистка перед перерисовкой

      const containerWidth = wrapperRef.current.clientWidth;
      const width = containerWidth;
      const height = 250;
      const marginTop = 20;
      const marginRight = 15;
      const marginBottom = 30;
      const marginLeft = 15;

      const tempData = (temps || [17, 18, 35, 23, 23, 16, 9, 8, 5]).map((temp, i) => ({
        time: i * 3,
        temp: Math.round(+temp),
      }));

      // шкалы
      const x = d3.scaleLinear()
        .domain(d3.extent(tempData, (d) => d.time))
        .range([marginLeft, width - marginRight]);

      const y = d3.scaleLinear()
        .domain([d3.min(tempData, (d) => d.temp) - 1, d3.max(tempData, (d) => d.temp) + 1])
        .range([height - marginBottom, marginTop]);

      // линия
      const line = d3.line()
        .x((d) => x(d.time))
        .y((d) => y(d.temp))
        .curve(d3.curveMonotoneX);

      svg.attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");

      // ось X
      const tickValues = d3.range(0, 25, 3);
      svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(
          d3.axisBottom(x)
            .tickValues(tickValues)
            .tickFormat((d) => d + ":00")
            .tickSize(0)
            .tickSizeOuter(0)
        )
        .selectAll(".tick text")
        .attr("fill", "#696b9b")
        .style("font-size", "13px");
      svg.selectAll(".domain").remove();

      const g = svg.append("g");

      // линия
      g.append("path")
        .datum(tempData)
        .attr("class", "line")
        .attr("d", line);

      // подписи температуры
      g.selectAll(".temp-label")
        .data(tempData)
        .enter()
        .append("text")
        .attr("class", "temp-label")
        .attr("x", (d) => x(d.time))
        .attr("y", (d) => y(d.temp) - 10)
        .text((d) => `${d.temp}°`);

      // градиент
      svg.append("defs").append("linearGradient")
        .attr("id", "area-gradient")
        .attr("x1", "0%").attr("y1", "0%")
        .attr("x2", "0%").attr("y2", "100%")
        .selectAll("stop")
        .data([
          { offset: "0%", color: "#696b9b", opacity: 0.7 },
          { offset: "100%", color: "#696b9b", opacity: 0 },
        ])
        .enter().append("stop")
        .attr("offset", (d) => d.offset)
        .attr("stop-color", (d) => d.color)
        .attr("stop-opacity", (d) => d.opacity);

      // область
      const area = d3.area()
        .x((d) => x(d.time))
        .y0(height - marginBottom)
        .y1((d) => y(d.temp))
        .curve(d3.curveMonotoneX);

      g.append("path")
        .datum(tempData)
        .attr("class", "area")
        .attr("d", area)
        .style("fill", "url(#area-gradient)");
    }

    drawDiagram();

    window.addEventListener("resize", drawDiagram);
    return () => window.removeEventListener("resize", drawDiagram);
  }, [temps]);

  return (
    <div ref={wrapperRef} className={`diagram ${className}`}>
      <h4 className="diagram__title">Температура в течение дня</h4>
      <svg ref={svgRef} className="diagram__image"></svg>
    </div>
  );
}
