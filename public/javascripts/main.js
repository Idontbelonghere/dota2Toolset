/*
 * @Author: kris
 * @Date:   2016-05-19 15:35:19
 * @Last Modified by:   kris
 * @Last Modified time: 2016-05-19 17:26:01
 */

'use strict';

$(function() {
    var windowHeight = $(window).height();
    $('#menu').height(windowHeight);
    $(window).resize(function() {
        var windowHeight = $(window).height();
        $('#menu').height(windowHeight);
    })

    $('#tenKills').on('click', function() {
        $.get('/10kills', function(data) {
            $('#content').html(data);
            $.getJSON('/api/get10kInfos', function(d) {
                new Vue({
                    el: '#app',
                    data: {
                        newTeam: '',
                        teamlist: d
                    },
                    methods: {
                        addTeam: function() {
                            var team = this.newTeam.trim();
                            var obj = {
                                "team": team,
                                "total": 0,
                                "fk": 0,
                                "fnk": 0,
                                "sk": 0,
                                "snk": 0,
                                "sAf": 0
                            };

                            if (team) {
                                this.teamlist.push(obj);
                                this.newTeam = ''
                            }
                        },
                        removeTeam: function(index) {
                            this.teamlist.splice(index, 1)
                        }
                    }
                })
            });

        })
    })

    $('#betProfit').on('click', function() {
        $.get('/betProfit', function(data) {
            $('#content').html(data);
            $('#save_A_TeamBetInfo').on('click', function() {
                var data = {};
                data.name = $('#teamName').val();
                data.avatar = $('#teamLogo').val();
                data.tkProfit = Number($('#tenKP').val());
                data.tkInvest = Number($('#tenKI').val());
                data.wgProfit = Number($('#winGameP').val());
                data.wgInvest = Number($('#winGameI').val());
                data.profit = Number($('#totalP').val());
                data.invest = Number($('#totalI').val());
                var str = JSON.stringify(data);
                console.log(str);
                $.post('/api/save_A_TeamBetInfo?Info=' + str, function(res) {
                    console.log(res.msg);
                })
            })
        })

    })

    $('#teamInfo').on('click', function() {
        $.get('/teaminfo', function(data) {
            $('#content').html(data);
        })
    })

    $('#schedule').on('click', function() {
        $.get('/schedule', function(data) {
            $('#content').html(data);

            function cgChange() {
                //- $(x).val()
                var tcg = $(this).val()
                var tcp = $(this).parent().siblings('.tcp').text();
                var d_v = tcg - tcp;
                $(this).parent().siblings('.tdv').text(d_v);
            };

            $('#getRes').on('click', function() {
                console.log(11111);
                var day_counter = 1;
                var s = parseInt($('#principal').val());
                var f = $('#factor').val();
                var d = parseInt($('#days').val());
                var trs = '';
                while (d) {
                    var td = {};
                    td.days = day_counter;
                    day_counter++;
                    s = s * f;
                    td.cp = s;
                    td.cg = '<input class="tcg" type="text" placeholder="filled with cash you got" />';
                    td.d_v = 'd_value';
                    var tds = '<td class="tdays">' + td.days + '</td><td class="tcp">' + td.cp + '</td><td >' + td.cg + '</td><td class="tdv">' + td.d_v + '</td>';
                    trs += '<tr>' + tds + '</tr>';
                    d--;
                };
                $('tbody').html(trs);
                $('.tcg').on('change', cgChange);

            })
        });


    })










});
