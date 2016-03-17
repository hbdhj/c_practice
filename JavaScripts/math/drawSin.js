var oX = 250;
var oY = 200;
function drawXAxis(len)
{
 mathUI.drawLine(oX - len, oY, oX + len, oY);
 mathUI.drawLine(oX + len - 5, oY - 5, oX + len, oY);
 mathUI.drawLine(oX + len - 5, oY + 5, oX + len, oY);
}

function drawYAxis(len)
{
 mathUI.drawLine(oX, oY - len, oX, oY + len);
 mathUI.drawLine(oX - 5, oY - len + 5, oX, oY - len);
 mathUI.drawLine(oX, oY - len, oX + 5, oY - len + 5);
}

function drawSin(axis_len, radius)
{
 var eal = ((2 * Math.PI) / axis_len);
 var pos = (oX - Math.round(axis_len / 2));
 var dig;
 var oldX = Math.round(oX - axis_len / 2);
 var oldY = oY;
 
 while(pos < (oX + Math.round(axis_len / 2))) {
  dig = ((pos - oX) * eal);
  cy = (oY + Math.round(Math.sin(dig) * radius / 2));
  mathUI.drawLine(oldX, oldY, pos, cy);

  oldX = pos;
  oldY = cy;
  pos++;
 }
}

var AXIS_LEN = 150;

drawXAxis(AXIS_LEN);
drawYAxis(AXIS_LEN);
drawSin(100, 100);