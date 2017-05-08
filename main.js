(function(){

    var datepicker = window.datepicker;
    var monthDate;
    var $wrapper;

    datepicker.buildUi = function(year, month){

        monthDate = datepicker.getMonthDate(year, month);

        var html = '<div class="ui_datepicker_header">'+
                        '<a href="#" class="ui_datepicker_btn ui_datepicker_prev_btn">&lt</a>'+
                        '<span class="ui_datepicker_curr_month">'+ monthDate.year+ '-' + monthDate.month +'</span>'+
                        '<a href="#" class="ui_datepicker_btn ui_datepicker_next_btn">&gt</a>'+
                    '</div>'+
                    '<div class="ui_datepicker_body">'+
                        '<table>'+
                            '<thead>'+
                                '<tr>'+
                                    '<th>一</th>'+
                                    '<th>二</th>'+
                                    '<th>三</th>'+
                                    '<th>四</th>'+
                                    '<th>五</th>'+
                                    '<th>六</th>'+
                                    '<th>日</th>'+
                                '</tr>'+
                            '</thead>'+
                            '<tbody>';
                                for(var i = 0; i < monthDate.days.length; i++){
                                    var date = monthDate.days[i];
                                    if(i%7 === 0){
                                        html += '<tr>';
                                    }
                                    html += '<td data-date = "'+ date.date +'">'+ date.showDate + '</td>';
                                    if(i%7 === 6){
                                        html += '</tr>';
                                    }
                                }
                            
                        html += '</tbody>'+
                        '</table>'+
                    '</div>';

        return html;

    };

    datepicker.render = function(direction){
        var year, month;
        if(monthDate){
            year = monthDate.year;
            month = monthDate.month;
        }
        if(direction === 'prev') month--;
        if(direction === 'next') month++;
        
        var html = datepicker.buildUi(year, month);
        $wrapper = document.createElement('div');
        $wrapper.className = 'ui_datepicker_wrapper';
        $wrapper.innerHTML = html;
        document.body.appendChild($wrapper);
    };

    datepicker.init = function(input){

        datepicker.render();

        var $input = document.querySelector(input);
        var isOpen = false;
        $input.addEventListener('click', function(){
            if(isOpen){
                $wrapper.classList.remove('ui_datepicker_wrapper_show');
                isOpen = false;
            }else{
                $wrapper.classList.add('ui_datepicker_wrapper_show');
                var left = $input.offsetLeft;
                var top = $input.offsetTop;
                var height = $input.offsetHeight;
                $wrapper.style.top = top + height + 2 + 'px';
                $wrapper.style.left = left + 'px';
                isOpen = true;
            }
        }, false);

         $wrapper.addEventListener('click', function(e){
            var $target = e.target;
            if(!$target.classList.contains('ui_datepicker_btn')) 
                return;
            if($target.classList.contains('ui_datepicker_prev_btn')){
                datepicker.render('prev');
                console.log($wrapper);
            }else if($target.classList.contains('ui_datepicker_next_btn')){
                datepicker.render('next');
            }
        }, false);

        $wrapper.addEventListener('click', function(e){
            var $target = e.target;
            if($target.tagName.toLowerCase() !== 'td') return;

            var date = new Date(monthDate.year, monthDate.month - 1, $target.dataset.date);
            $input.value = format(date);
            $wrapper.classList.remove('ui_datepicker_wrapper_show');
            isOpen = false;

        }, false);

    };



    function format(date){
        ret = '';
        var padding = function(num){
            if(num <= 9){
                return '0' + num;
            }
            return num;
        }
        ret += date.getFullYear() + '-';
        ret += padding(date.getMonth() + 1) + '-';
        ret += padding(date.getDate());
        return ret;
    }
})()