

 var context;
 var centreX ;
 var centreY ;
 var segment;
 var startAng;
 var endAng;
var total;
var data;
var radious;
var color;
var canvas;

function CreatePieChartAnimation(canvas1,radious1,evt,data1,color1)
{


  canvas=canvas1;
  context = canvas.getContext('2d');
  centreX = canvas.width / 2;
  centreY = canvas.height / 2;
  segment=0;
  startAng=0;
  endAng=0;
 total=0;
 data=data1;
 radious=radious1;
 color=color1;
 
 for(var m=0;m<data.length;m++)
   {
total+=data[m];
   }
  

  var mousePos = getMousePos(evt);
               
    //alert("MosX:"+mousePos.x+"mouY: "+mousePos.y);    
    
    DrawAll();
   
    if(AngleByMousePoint(mousePos.x,mousePos.y,radious)>0.0)
    {
   
        FindSegment(AngleByMousePoint(mousePos.x,mousePos.y,radious));  
       
        Draw();
        DrawText();
        
       
    }
    
    
   
}


function DrawAll()
{

context.clearRect(0, 0, canvas.width, canvas.height);
startAngle=0;
endAngle=0;

for(var i=0;i < data.length;i++)
{
    
      context.beginPath();
      endAngle+=(data[i]*2*Math.PI)/total;  
      context.moveTo(0,0);
      context.lineTo(0, 0);
      context.arc(0, 0, 70, startAngle, endAngle, false);
      context.closePath();
      context.lineWidth = 1;
      context.fillStyle = color[i];
      context.fill();
      context.strokeStyle = 'white';
      context.stroke();

startAngle=endAngle;


}

}

function DrawText()
{
var str1=""+(data[segment-1]/total)*100;
str1=str1.substring(0,4);
var str=""+data[segment-1]+"/"+str1+"%";
 context.fillStyle = 'blue';
 context.font = 'italic 20px Calibri';
 context.fillText(str, 0,radious+20);
}

function Draw()
{

var x=0;
var y=0;
     
     //context.transition(1000);
      context.beginPath();  
      context.moveTo(x,y);       
      context.lineTo(x, y);
      context.arc(x, y, radious+14, startAng, endAng, false);    
      context.closePath();        
      context.lineWidth = 6;
      context.fillStyle =color[segment-1];          
      context.fill();
      context.strokeStyle = 'white';
      context.stroke();
      
     // context.rotate(endAng);
      
}

 function getMousePos( evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
      


function AngleByMousePoint(x1,y1,radious1)
{

var angle=0.0;
var x=x1-centreX;
var y=y1-centreY;

if(radious < Math.sqrt((x*x +y*y)))
{
angle=0.0;

return angle;
}

if(x!=0)
{
angle=Math.atan(y/x);

}

if(angle>0)
{
if(x <0 )

{
angle=angle+Math.PI;
}
}
else
{

angle=-angle;
if(x>0)
{
angle=Math.PI*2 -angle;
}

else

{
angle=Math.PI -angle;
}

}

return angle;
}


function FindSegment(angle)
{

var temAng=0;
segment=0;
var i;
for ( i=0;i < data.length;i++)
{

startAng=temAng;
temAng+=(data[i]/total)*Math.PI*2;
endAng=temAng;
segment++;

if(temAng>=angle)
{
  break;
}
}

}


  
  
  
   
      
      