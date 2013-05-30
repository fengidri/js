jQuery.fn.canvas_animate = function(){
    var canvas               = { }
    canvas.createNew         = function()
    {
        var obj       = { }
        timer_space   = 100;
        move_fun_list = [];
        obj.width     =10;
        obj.line      = function( x,y,offset_x,offset_y)
        { 
            this.ctx.beginPath();
            this.ctx.moveTo(x,y);
            this.ctx.lineWidth=obj.width;
            this.ctx.lineTo(offset_x,offset_y);
            this.ctx.stroke();
        }
    
        obj.move_fun=function( )
        { 
            return 0;
        }
    
        obj.move=function()
        { 
            timer=setInterval(function()
            {
                if(move_fun_list.length==0)
                {
                    clearInterval(timer);
                }else
                {
                    back=move_fun_list[0]()
                    if(back<1){
                        move_fun_list.shift()
                    }
                }
            },this.timer_space)
        }
    
    
        obj.draw_line=function(x,y,offset_x,offset_y,time )
        { 
            var back=function( )
            {
                var n             = time*timer_space;
                var x_space       = (offset_x-x)/n;
                var y_space       = (offset_y-y)/n;
                var back          = n
                draw_line_fun = function( ){
                    obj.line( x,y,x+x_space,y+y_space);
                    x    = x+x_space;
                    y    = y+y_space;
                    back = back -1
                    return back
                }
                return draw_line_fun;
            }
            move_fun_list.push(back())
    
        }
        obj.draw_line_m=function()//x1,y1,x2,y2,x3,y3,x4,y4,time
        { 
            var numargs      = arguments.length;
            var args         = Array.prototype.slice.call(arguments); 
            var length       = [];
            var length_total = 0;
            var t;
            var times        = [];
            if(numargs %2==0){
                var time=3;
            }else{ 
                var time=args.pop( );
            }
            for( var i = 0;i<arguments.length -4;i = i+2){
    
                t= Math.abs( 
                        Math.sqrt(Math.pow(args[i],2) + Math.pow(args[i+1],2)) -
                        Math.sqrt(Math.pow(args[i+2],2) + Math.pow(args[i+3],2))
                        )
                length.push(t)
                length_total=length_total + t;
            }
            for( i in length){ 
                times.push( length[i]/length_total*time);
            }
            for( i in times){ 
                t=2*i;
                this.draw_line(args[t],args[t+1],
                        args[t+2],args[t+3], times[i])
            }
         //   this.move()
    
    
        }
        return obj;
    }
    //#############################
    var can;
    can =  canvas.createNew( );
    can.ctx=$(this)[0].getContext("2d")
    return can
    

}
