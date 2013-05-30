//
jQuery.fn.cloud         = function(){
    var Cloud           = {};
    Cloud.timer_space   = 100;
    Cloud.center_x      = 300;
    Cloud.center_y      = 300;
    Cloud.R             = 160;
    Cloud.speed         = 0.05;
    Cloud.move_fun_list = [];
    Cloud.CreateNew     = function(list){

        var obj       = {}
        obj.obj   = list[1];
        obj.title = list[0];


        obj.R   = Cloud.R;
        obj.rad = 2*Math.PI *Math.random();
        obj.x   = obj.R* (1 - 2 * Math.random());
        obj.r      = Math.sqrt(obj.R * obj.R  - obj.x* obj.x);
        obj.offset  = function(){

            this.rad     = obj.rad + Cloud.speed;
            tmp         =Math.cos(this.rad);
            this.size    = Math.pow(tmp+2,3) ;
            this.z_index = Math.floor(( Math.cos(obj.rad)) * 300) + 300;
            this.y       = obj.r * Math.sin(obj.rad);

            this.offset_x = Cloud.center_x + obj.x;
            this.offset_y = Cloud.center_y - obj.y;
            this.obj.css({'top':obj.offset_y,'left':obj.offset_x,
                'font-size':this.size,'z-index':obj.z_index});

        }
        obj.offset();
        return obj;
    }
    Cloud.move=function(){
        this.timer=setInterval(function()
        {
            for(i in Cloud.move_fun_list){
                Cloud.move_fun_list[i].offset()

            }
        },this.timer_space)

    }
    Cloud.stop=function(){
        clearInterval(this.timer);

    }
    //##################################################################
    $(this).children('div').each( function()
            { 
                var list    = [];
                list[0] = $(this).children('span').text();
                list[1]     = $(this);
                $(this).css('cursor','pointer')
                Cloud.move_fun_list.push(Cloud.CreateNew(list));
                $(this).children('span').hover(function(){
                    $(this).css('color','blue');
                    Cloud.stop();

                },
                function(){
                    $(this).css('color','black');
                    Cloud.move();


                }
                )
            })
    Cloud.move();
}















