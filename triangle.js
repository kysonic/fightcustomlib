
// ### Triangle Object ###

var Triangle = function(superclass,center,delta,direction,text,rotate,viewPoints) {
    this.center = center;
    this.delta = delta;
    this.strokeColor = '#000';
    this.fillColor = '#000';
    this.rotate = rotate;   
    this.rotateCenter = superclass.rotateCenter;
    this.direct = direction;
    this.text = text;
    this.xTextOffset = 1.5;
    this.yTextOffset = 0;
    // Define the triangle point, he creating depending on direction 
    var point1,point2,point3;
    
    var path = new Path();
    var textPoint = new PointText();

    this.init = function() {
        switch(this.direct) {
            case 'top':
                point1 = new Point(center.x-delta,center.y+delta);
                point2 = new Point(center.x+delta,center.y+delta);
                point3 = new Point(center.x,center.y-delta);
            break;
            case 'right': 
                point1 = new Point(center.x-delta,center.y+delta);
                point2 = new Point(center.x-delta,center.y-delta);
                point3 = new Point(center.x+delta,center.y);
            break
        }
        path.add(point1);
        path.add(point2);
        path.add(point3);
        path.rotate(this.rotate,this.rotateCenter);

      

        if(!Fight.isEmpty(this.text)) {
            textPoint.remove();
            textPoint = new PointText(new Point(center.x+delta*this.xTextOffset,center.y-delta*this.yTextOffset));
            textPoint.content = this.text;
            textPoint.rotate(this.rotate,this.rotateCenter);
            textPoint.style = {
                fontSize: 20,
                fillColor: 'black',
                justification: 'center'
            };
        }

        path.strokeColor = this.strokeColor;
        path.fillColor = this.fillColor;
    
        path.closed = true;

    // Draw peak's
        if(viewPoints) {
            var circle = new Path.Circle(center,2);
            circle.fillColor = '#FF0055';

            var circle = new Path.Circle(point1,2)
            circle.fillColor = '#FF0055';

            var circle = new Path.Circle(point2,2)
            circle.fillColor = '#FF0055';

            var circle = new Path.Circle(point3,2)
            circle.fillColor = '#FF0055';

            path.storkeColor = this.strokeColor;
            path.fillColor = this.fillColor;
        }
        
       
    }
    // Draw
    this.draw = function() {
            path.remove();
            path = new Path();
            this.init();
        }
}

// ### Triangle Object ###
