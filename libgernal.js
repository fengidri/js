function sleep(n) { //sleep
    var start = new Date().getTime(); 
    while(true)  if(new Date().getTime()-start > n) break; 
}
function set(array){//set
    var tmp=[]

    var flag=0
    for (i in array){
        flag=0
        for(ii in tmp){
            if(tmp[ii]== array[i])
            {
                flag=1;
                break;
            }

        }
        if(flag==0){
            tmp.push(array[i])
        }

    }
    return tmp

}
function get_key(array,value){//得到key
    for(i in array){
        if(array[i]==value){
            return i;
        }
    }
}
function shuffle(array){ //v1.0//乱序 list
    var j;
    var x;
	for(var i = array.length -1 ; i; i--){
        j = parseInt(Math.random() * i); 
        x = array[i]; 
        array[i] = array[j]; 
        array[j] = x;
    }
	return array;
};
