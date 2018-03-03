document.addEventListener('DOMContentLoaded', function() {
  const svg = d3.select('.bar-chart svg');
  const width = +svg.attr('width');
  const height = +svg.attr('height') / 2;
  const g = svg.append('g');

  const n = 60;
  const minY = 0.2;
  const hueDelta = 360 / n;

  const x = d3.scaleBand()
    .rangeRound([0, width])
    .domain([...Array(n).keys()]);
  const y = d3.scaleLinear()
    .rangeRound([height, 0])
    .domain([0, 1 + minY]);

  const draw = (data) => {
    g.selectAll('.bar')
      .remove()
      .exit()
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('fill', (v, i) =>
            'hsla(' + (i - round) * hueDelta + ', 90%, 40%, 1)')
      .attr('x', (_, i) => x(i))
      .attr('y', v => y(v + minY))
      .attr('width', x.bandwidth())
      .attr('height', v => 2 * (height - y(v + minY)));
  };

  let round = 0;
  let data = [...Array(n).keys()].map((_, i) => 0);

  setInterval(() => {
    data = data.map(v => {
      let newV = v;
      if (v === 1) { newV = v - 0.1; }
      else if (v === 0) { newV = v + 0.1; }
      else {
        const random = Math.random();
        newV = random < 0.5 ? v - 0.1 : v + 0.1;
      }
      return Math.round(newV * 10) / 10;
    });
    round = round === 359 ? 0 : round + 1;
    draw(data);
  }, 100);
  draw(data);
}, false);
