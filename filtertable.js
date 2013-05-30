function set(array,t){
	var tmp=0
	for(var i =0; i < array.length; i++){
		if(array[i] == t){
			tmp=1
		}
	}
	if (tmp==0){
		array.push(t)
	}
	return array
}
function conditions(obj,n){
	lists_item= new Array()
	obj.each(function(){
		var  t =$(this).find('td:nth-child('+ n +')').text()
		lists_item=set(lists_item,t)
	})
	return lists_item
}
function obj_by_conditions(obj,n,condition){
	//这是提取子条件
	//在tbody为id的dom中取得第m列的条件
	//前提是n列为filter
	var arr = new Array()
	obj.each(function(){
		var  h =$(this).find('td:nth-child('+ n +')').text()
		if(h==condition){
		  arr.push(this)
		}
	})
	return $(arr)
}
function tr_show(tr,table_n1,filter1,table_n2,filter2){
			tr.each(function(){
				var  t =$(this).find('td:nth-child('+ table_n1 +')').text()
				var  h =$(this).find('td:nth-child('+ table_n2 +')').text()
				if (t==filter1 &  h == filter2){
					$(this).show()
				}else{
					$(this).hide()
				}
			})
}
function select_updata(id,list){
	//根据select的jquery进行选择,这里的id是#select 之类的
	//list是要加入的一个数组
	//并且这里假定,第一个options是不变的,
	var  select = $(id).get(0)
	select.options.length=1;
	for(i in list){
		select.add(new Option(list[i],0));
	}

}
function filtertable(){
	var numargs = arguments.length;
	if(numargs == 1){
		id=arguments[0],
		table_n1=5,
		table_n2=6,
		select_id1='#filter1',
		select_id2='#filter2'
	}
	if(numargs == 3){
		id=arguments[0],
		table_n1=arguments[1],
		table_n2=arguments[2],
		select_id1='#filter1',
		select_id2='#filter2'
	}
		var tr = $(id + '>tr')
		//tr.hide()//隐藏表格
		//提取查询条件
		lists_item = conditions(tr,table_n1)
		//更新select
		select_updata(select_id1,lists_item)
		$(select_id1).change(function(){
			//取得当前的选择
			var selected = $(this).find("option:selected").text();
			//得到当前选择下的下一级的可用的条件
			var obj=obj_by_conditions(tr,table_n1,selected);
			var list= conditions(obj,table_n2)
			//更新下一级的条件
			select_updata(select_id2,list)
		})
		$(select_id2).change(function(){
			var	filter1 =$(select_id1).find("option:selected").text();
			var filter2 = $(this).find("option:selected").text();
			tr_show(tr,table_n1,filter1,table_n2,filter2);
		})
		$('#show_all_tr').click(function(){
		  tr.show()
		})
}
