/*
 * @Author: kris
 * @Date:   2016-05-19 15:35:19
 * @Last Modified by:   Idontbelonghere
 * @Last Modified time: 2016-06-02 11:23:42
 */

'use strict';

$(function() {
    var windowHeight = $(window).height();
    $('.row').height(windowHeight);
    $(window).resize(function() {
        var windowHeight = $(window).height();
        $('.row').height(windowHeight);
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
            $('.gr').each(function(){
                var grval = $(this).attr('grval');
                if(grval>0){
                    $(this).find('span').addClass('setGreen');
                };
                if(grval<0){
                    $(this).find('span').addClass('setRed');
                }
            })


            $('#save_A_TeamBetInfo').on('click', function() {
                var data = {};
                data.name = $('#initialteamName').val();
                data.avatar = $('#initialteamLogo').val();
                data.tkProfit = Number($('#initialtenKP').val());
                data.tkInvest = Number($('#initialtenKI').val());
                data.wgProfit = Number($('#initialwinGameP').val());
                data.wgInvest = Number($('#initialwinGameI').val());
                data.profit = Number($('#initialtotalP').val());
                data.invest = Number($('#initialtotalI').val());
                var str = JSON.stringify(data);
                $.post('/api/save_A_TeamBetInfo?Info=' + str, function(res) {
                    console.log(res.msg);
                })

            })
            $('.updateInfo').on('click', function() {
                $(this).parent().hide();
                $(this).parent().siblings('.betAddtion').show();
            })
            $('.cancleBtn').on('click', function() {
                //need refresh teamCard's info, not by F5.
                $(this).parent().hide();
                $(this).parent().siblings('.front').show();
                $(this).siblings('.lineInput').val('');
            })
            $('.saveBtn').on('click', function() {
                var data = {};
                data.name = $.trim($(this).siblings('.teamName').html());
                data.onceTP = Number($(this).siblings('.onceTP').val()) || 0;
                data.onceTI = Number($(this).siblings('.onceTI').val()) || 0;
                data.onceWP = Number($(this).siblings('.onceWP').val()) || 0;
                data.onceWI = Number($(this).siblings('.onceWI').val()) || 0;
                var str = JSON.stringify(data);
                console.log(data);
                if ((data.onceTI == 0) && (data.onceTP == 0) && (data.onceWI == 0) && (data.onceWP == 0)) {
                    alert('can not be empty');
                } else {
                    $.post('/api/save_each_bet?Info=' + str, function(res) {
                        console.log(res);
                    })
                    $(this).siblings('.lineInput').val('');
                }
            })
        })

    })

    $('#teamInfo').on('click', function() {
        $.get('/teaminfo', function(data) {
            $('#content').html(data);

            $.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars',function(data){
                var trs='';
                $.each(data.items, function(index,val){
                    trs += '<li>'+val.name+'</li>';
                });
                $('#githubRanks').html('<ol>'+trs+'</ol>');
            })
        })
    })

    $('#schedule').on('click', function() {
        $.get('/schedule', function(data) {
            $('#content').html(data);

            function cgChange() {
                var tcg = $(this).val()
                var tcp = $(this).parent().siblings('.tcp').text();
                var d_v = tcg - tcp;
                $(this).parent().siblings('.tdv').text(d_v);
            };

            $('#getRes').on('click', function() {
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
