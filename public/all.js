(function() {
  var areas, bubbleSort, locations, renderStatAreas, renderStatAreasLines, renderStatLocations, renderStatLocationsLines, statByArea, statByAreaLines, statByLocation, statByLocationsLines, statByMonth, stateByYear;

  areas = ['移动互联网', '电子商务', 'SNS社交网络', '广告营销', '搜索引擎', '游戏动漫', '电子硬件', '媒体资讯', '多媒体娱乐工具', '软件消费', '生活金融服务', '医疗健康', '企业服务', '旅游户外', '房产酒店', '文化艺术体育', '教育培训', '汽车交通', '法律法务', '其他'];

  locations = ['北京', '天津', '河北', '山西', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '内蒙古'];

  statByArea = function(records) {
    var area, d, data, index, r, results, _i, _j, _len, _len1;
    results = [];
    for (_i = 0, _len = areas.length; _i < _len; _i++) {
      area = areas[_i];
      r = [];
      r[0] = area;
      r[1] = 0;
      results.push(r);
    }
    data = records.data;
    for (_j = 0, _len1 = data.length; _j < _len1; _j++) {
      d = data[_j];
      index = areas.indexOf(d.area);
      if (index >= 0) {
        results[index][1] += 1;
      }
    }
    return results;
  };

  statByAreaLines = function(records) {
    var area, d, data, i, index, r, results, _i, _j, _k, _len, _len1, _len2;
    results = [];
    data = [];
    for (_i = 0, _len = areas.length; _i < _len; _i++) {
      area = areas[_i];
      r = [];
      r[0] = area;
      r[1] = [];
      results.push(r);
      data.push(r);
    }
    for (_j = 0, _len1 = records.length; _j < _len1; _j++) {
      d = records[_j];
      index = areas.indexOf(d.area);
      if (index >= 0) {
        results[index][1].push(d.date);
      }
    }
    for (i = _k = 0, _len2 = results.length; _k < _len2; i = ++_k) {
      r = results[i];
      data[i][1] = statByMonth(r);
    }
    return data;
  };

  statByLocationsLines = function(records) {
    var d, data, i, index, location, r, results, _i, _j, _k, _len, _len1, _len2;
    results = [];
    data = [];
    for (_i = 0, _len = locations.length; _i < _len; _i++) {
      location = locations[_i];
      r = [];
      r[0] = location;
      r[1] = [];
      results.push(r);
      data.push(r);
    }
    for (_j = 0, _len1 = records.length; _j < _len1; _j++) {
      d = records[_j];
      index = locations.indexOf(d.location);
      if (index >= 0) {
        results[index][1].push(d.date);
      }
    }
    for (i = _k = 0, _len2 = results.length; _k < _len2; i = ++_k) {
      r = results[i];
      data[i][1] = statByMonth(r);
    }
    return data;
  };

  statByMonth = function(records) {
    var d, data, index, labels, results, _i, _len;
    data = bubbleSort(records[1]);
    labels = [];
    results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      index = labels.indexOf(d);
      if (index >= 0) {
        if (results[index]) {
          results[index][1] += 1;
        }
      } else {
        labels.push(d);
        results.push([d, 1]);
      }
    }
    return results;
  };

  bubbleSort = function(list) {
    var anySwaps, swapPass;
    anySwaps = false;
    swapPass = function() {
      var r, _i, _ref, _ref1, _results;
      _results = [];
      for (r = _i = 0, _ref = list.length - 2; 0 <= _ref ? _i <= _ref : _i >= _ref; r = 0 <= _ref ? ++_i : --_i) {
        if (list[r] > list[r + 1]) {
          anySwaps = true;
          _results.push((_ref1 = [list[r + 1], list[r]], list[r] = _ref1[0], list[r + 1] = _ref1[1], _ref1));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    swapPass();
    while (anySwaps) {
      anySwaps = false;
      swapPass();
    }
    return list;
  };

  stateByYear = function(records) {
    var limit, r, results, years, _i, _len;
    years = ['2010', '2011', '2012', '2013', '2014'];
    limit = [1262275200000, 1293811200000, 1325347200000, 1356969600000, 1388505600000];
    results = [
      {
        name: '2010',
        data: []
      }, {
        name: '2011',
        data: []
      }, {
        name: '2012',
        data: []
      }, {
        name: '2013',
        data: []
      }, {
        name: '2014',
        data: []
      }
    ];
    for (_i = 0, _len = records.length; _i < _len; _i++) {
      r = records[_i];
      if (r.date > limit[4]) {
        results[4].data.push(r);
      } else if (r.date > limit[3]) {
        results[3].data.push(r);
      } else if (r.date > limit[2]) {
        results[2].data.push(r);
      } else if (r.date > limit[1]) {
        results[1].data.push(r);
      } else if (r.date > limit[0]) {
        results[0].data.push(r);
      }
    }
    return results;
  };

  statByLocation = function(records) {
    var d, data, index, location, r, results, _i, _j, _len, _len1;
    results = [];
    for (_i = 0, _len = locations.length; _i < _len; _i++) {
      location = locations[_i];
      r = {};
      r.name = location;
      r.value = 0;
      results.push(r);
    }
    data = records.data;
    for (_j = 0, _len1 = data.length; _j < _len1; _j++) {
      d = data[_j];
      index = locations.indexOf(d.location);
      if (index >= 0) {
        results[index].value += 1;
      }
    }
    return results;
  };

  renderStatAreas = function(data) {
    var data_year, data_years, i, results, _i, _len, _results;
    data_years = stateByYear(data.companies);
    _results = [];
    for (i = _i = 0, _len = data_years.length; _i < _len; i = ++_i) {
      data_year = data_years[i];
      results = statByArea(data_year);
      _results.push($('#areas-' + i).highcharts({
        title: {
          text: "" + data_year.name + "年"
        },
        series: [
          {
            type: 'pie',
            name: 'Browser share',
            data: results
          }
        ]
      }));
    }
    return _results;
  };

  renderStatAreasLines = function(data) {
    var r, results, series, t, _i, _len;
    results = statByAreaLines(data.companies);
    series = [];
    for (_i = 0, _len = results.length; _i < _len; _i++) {
      r = results[_i];
      t = {};
      t.name = r[0];
      t.data = r[1];
      series.push(t);
    }
    return $('#lines-areas-content').highcharts({
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: '近五年来公司领域分布'
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Date'
        }
      },
      series: series,
      credits: {
        enabled: false
      }
    });
  };

  renderStatLocationsLines = function(data) {
    var r, results, series, t, _i, _len;
    results = statByLocationsLines(data.companies);
    series = [];
    for (_i = 0, _len = results.length; _i < _len; _i++) {
      r = results[_i];
      t = {};
      t.name = r[0];
      t.data = r[1];
      series.push(t);
    }
    return $('#lines-locations-content').highcharts({
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: '近五年来公司地域分布'
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Date'
        }
      },
      credits: {
        enabled: false
      },
      series: series
    });
  };

  renderStatLocations = function(data) {
    var data_year, data_years, i, results, _i, _len, _results;
    data_years = stateByYear(data.companies);
    _results = [];
    for (i = _i = 0, _len = data_years.length; _i < _len; i = ++_i) {
      data_year = data_years[i];
      results = statByLocation(data_year);
      _results.push($('#locations-' + i).highcharts('Map', {
        chart: {
          width: '800',
          height: '400'
        },
        colorAxis: {
          min: 0,
          minColor: '#FFFFFF',
          maxColor: '#FF6722'
        },
        title: {
          text: "" + data_year.name + "年"
        },
        series: [
          {
            data: results,
            mapData: Highcharts.maps['countries/cn/custom/cn-all-sar-taiwan'],
            joinBy: 'name',
            name: '公司数量',
            states: {
              hover: {
                color: '#6EE5D8'
              }
            }
          }
        ],
        credits: {
          enabled: false
        }
      }));
    }
    return _results;
  };

  $(document).ready(function() {
    return $.getJSON('/company.json').done(function(data) {
      $('#content').html($('#t-lines-areas').html());
      renderStatAreasLines(data);
      $('#areas').click(function() {
        $('.button').removeClass('active');
        $('#details-areas').addClass('active');
        $('#areas').parent().find('.sub-nav').toggle('slow');
        $('#content').html($('#t-lines-areas').html());
        return renderStatAreasLines(data);
      });
      $('#details-areas').click(function() {
        $('.button').removeClass('active');
        $('#details-areas').addClass('active');
        $('#content').html($('#t-details-areas').html());
        return renderStatAreas(data);
      });
      $('#lines-areas').click(function() {
        $('.button').removeClass('active');
        $('#lines-areas').addClass('active');
        $('#content').html($('#t-lines-areas').html());
        return renderStatAreasLines(data);
      });
      $('#locations').click(function() {
        $('.button').removeClass('active');
        $('#lines-locations').addClass('active');
        $('#locations').parent().find('.sub-nav').toggle('slow');
        $('#content').html($('#t-lines-locations').html());
        return renderStatLocationsLines(data);
      });
      $('#lines-locations').click(function() {
        $('.button').removeClass('active');
        $('#lines-locations').addClass('active');
        $('#content').html($('#t-lines-locations').html());
        return renderStatLocationsLines(data);
      });
      return $('#details-locations').click(function() {
        $('.button').removeClass('active');
        $('#details-locations').addClass('active');
        $('#content').html($('#t-locations').html());
        return renderStatLocations(data);
      });
    });
  });

}).call(this);

(function() {
  var areas, bubbleSort, renderStatTimesLines, statByMonth, statByTimesLines;

  areas = ['移动互联网', '电子商务', 'SNS社交网络', '广告营销', '搜索引擎', '游戏动漫', '电子硬件', '媒体资讯', '多媒体娱乐工具', '软件消费', '生活金融服务', '医疗健康', '企业服务', '旅游户外', '房产酒店', '文化艺术体育', '教育培训', '汽车交通', '法律法务', '其他'];

  statByTimesLines = function(records) {
    var area, d, data, i, index, r, results, _i, _j, _k, _len, _len1, _len2;
    results = [];
    data = [];
    for (_i = 0, _len = areas.length; _i < _len; _i++) {
      area = areas[_i];
      r = [];
      r[0] = area;
      r[1] = [];
      results.push(r);
      data.push(r);
    }
    for (_j = 0, _len1 = records.length; _j < _len1; _j++) {
      d = records[_j];
      index = areas.indexOf(d.area);
      if (index >= 0) {
        results[index][1].push(d.date);
      }
    }
    for (i = _k = 0, _len2 = results.length; _k < _len2; i = ++_k) {
      r = results[i];
      data[i][1] = statByMonth(r);
    }
    return data;
  };

  statByMonth = function(records) {
    var d, data, index, labels, results, _i, _len;
    data = bubbleSort(records[1]);
    labels = [];
    results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      index = labels.indexOf(d);
      if (index >= 0) {
        if (results[index]) {
          results[index][1] += 1;
        }
      } else {
        labels.push(d);
        results.push([d, 1]);
      }
    }
    return results;
  };

  bubbleSort = function(list) {
    var anySwaps, swapPass;
    anySwaps = false;
    swapPass = function() {
      var r, _i, _ref, _ref1, _results;
      _results = [];
      for (r = _i = 0, _ref = list.length - 2; 0 <= _ref ? _i <= _ref : _i >= _ref; r = 0 <= _ref ? ++_i : --_i) {
        if (list[r] > list[r + 1]) {
          anySwaps = true;
          _results.push((_ref1 = [list[r + 1], list[r]], list[r] = _ref1[0], list[r + 1] = _ref1[1], _ref1));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    swapPass();
    while (anySwaps) {
      anySwaps = false;
      swapPass();
    }
    return list;
  };

  renderStatTimesLines = function(data) {
    var r, results, series, t, _i, _len;
    results = statByTimesLines(data.investevents);
    series = [];
    for (_i = 0, _len = results.length; _i < _len; _i++) {
      r = results[_i];
      t = {};
      t.name = r[0];
      t.data = r[1];
      series.push(t);
    }
    return $('#lines-times-content').highcharts({
      title: {
        text: '公司融资记录'
      },
      chart: {
        zoomType: 'xy'
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: '时间'
        }
      },
      yAxis: {
        title: {
          text: '数量'
        }
      },
      credits: {
        enabled: false
      },
      series: series
    });
  };

  $(document).ready(function() {
    return $.getJSON('/investevents.json').done(function(data) {
      $('#content').html($('#t-lines-times').html());
      renderStatTimesLines(data);
      return $('#times').click(function() {
        $('#content').html($('#t-lines-times').html());
        return renderStatTimesLines(data);
      });
    });
  });

}).call(this);
