(function(){

    var datepicker = window.datepicker;

    datepicker.buildUi = function(year, month){

        var monthDate = datepicker.getMonthDate(year, month);

        var html = '<div class="ui_datepicker_header">'+
                        '<a href="javascript::;" class="ui_datepicker_btn ui_datepicker_prev_btn">&lt</a>'+
                        '<span class="ui_datepicker_curr_month">2016-1</span>'+
                        '<a href="javascript::;" class="ui_datepicker_btn ui_datepicker_next_btn">&gt</a>'+
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
                                for(var i = 0; i < monthDate.length; i++){
                                    var date = monthDate[i];
                                    if(i%7 === 0){
                                        html += '<tr>';
                                    }
                                    html += '<td>'+ date.showDate + '</td>';
                                    if(i%7 === 6){
                                        html += '</tr>';
                                    }
                                }
                            
                        html += '</tbody>'+
                        '</table>'+
                    '</div>';

        return html;

    };

    datepicker.init = function($dom){
        var html = datepicker.buildUi();
        $dom.innerHTML = html;
    }

})()