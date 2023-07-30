import React, { useEffect } from "react";
import { Container } from "reactstrap";

export default function PageHeader() {
  
  useEffect(() => {
    var c = document.getElementById("c");
    var ctx = c.getContext("2d");
    
    c.height = window.innerHeight;
    c.width = window.innerWidth;
    
    var matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    matrix = matrix.split("");
    
    var font_size = 10;
    var columns = c.width/font_size; 
    var drops = [];
    
    for(var x = 0; x < columns; x++)
        drops[x] = 1; 
    
    function draw()
    {
        ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
        ctx.fillRect(0, 0, c.width, c.height);
    
        ctx.fillStyle = "#f4427d";
        ctx.font = font_size + "px arial";
        
        for(var i = 0; i < drops.length; i++)
        {
            var text = matrix[Math.floor(Math.random()*matrix.length)];
            ctx.fillText(text, i*font_size, drops[i]*font_size);
    
            if(drops[i]*font_size > c.height && Math.random() > 0.975)
                drops[i] = 0;
    
            drops[i]++;
        }
    }
    
    var interval = setInterval(draw, 35);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-header header-filter" style = {{placeItems: 'center'}}>
      <div style={{}}>
        <Container style = {{}}>
          <div style = {{height:'80vh'}}/>
          <div className="content-center brand" style = {{textAlign:'center'}}>
            <h1 className="h1-seo">The Algorithms Club</h1>
            <h3 className="d-none d-sm-block">
              or perhaps its Iterate. Who knows?
            </h3>
          </div>
        </Container>
      </div>
      <canvas id="c" style={{position: 'absolute', top: '0', left: '0'}}></canvas>
    </div>
  );
}
