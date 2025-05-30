 
export function drawDiagram(temps = [17, 18, 35, 23, 23, 16, 9, 8, 5]) {
  const tempData = temps.map((temp, i) => ({
    time: i*3,
    'temp': Math.round(+temp)
  }));

  const width = 800;
  const height = 250;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  //шкалы
  const x = d3.scaleLinear(
    d3.extent(tempData , d => d.time),
    [marginLeft, width - marginRight]);
  const y = d3.scaleLinear(
    [d3.min(tempData , d => d.temp) - 1, d3.max(tempData , d => d.temp) + 1],
    [height - marginBottom, marginTop]);
 
  //генератор линий
  const line = d3.line()
    .x(d => x(d.time))
    .y(d => y(d.temp))
    .curve(d3.curveMonotoneX);
 
  // получаем элемент SVG для создания графика
  const svg = d3.select("#diagram__image")
  svg.selectAll('*').remove();
  svg.attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  // Для оси X  
  // svg.append("g")
  // .attr("transform", `translate(0,${height - marginBottom})`)
  // .call(d3.axisBottom(x).ticks(8).tickSizeOuter(0));

  const tickValues = d3.range(0, 25, 3); 
  svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(
      d3.axisBottom(x)
        .tickValues(tickValues) // явные значения тиков
        .tickFormat(d => d + ":00") // добавляем "ч" к числам
        .tickSize(0)
        .tickSizeOuter(0)
    )
    .selectAll(".tick text")
      .attr("fill", "#696b9b")
      .style("font-size", "13px");

  svg.selectAll(".domain").remove();
 
  // Для оси Y
  // svg.append("g")
  //   .attr("transform", `translate(${marginLeft},0)`)
  //   .call(d3.axisLeft(y).ticks(height / 40).tickSizeOuter(0));

  let g = svg.append("g");

  // Основная линия 
  g.append("path")
  .datum(tempData) 
  .attr("class", "line") 
  .attr("d", line);

  g.selectAll(".temp-label")
  .data(tempData)
  .enter()
  .append("text")
  .attr("class", "temp-label")
  .attr("x", d => x(d.time)) // Позиция X совпадает с точкой
  .attr("y", d => y(d.temp) - 10) // На 10px выше точки
  .text(d => `${d.temp}°`);

  // Градиент на области
  svg.append("defs").append("linearGradient")
    .attr("id", "area-gradient")
    .attr("x1", "0%").attr("y1", "0%")
    .attr("x2", "0%").attr("y2", "100%")
    .selectAll("stop")
    .data([
        {offset: "0%", color: "#696b9b", opacity: 0.7},
        {offset: "100%", color: "#696b9b", opacity: 0}
    ])
    .enter().append("stop")
    .attr("offset", d => d.offset)
    .attr("stop-color", d => d.color)
    .attr("stop-opacity", d => d.opacity);

  // Работа с областью
  let area = d3.area()
    .x(d => x(d.time))
    .y0(height - marginBottom)
    .y1(d => y(d.temp))
    .curve(d3.curveMonotoneX);
  
  g.append("path")
    .datum(tempData)
    .attr("class", "area")
    .attr("d", area)
      .style("fill", "url(#area-gradient)");  

}
  


