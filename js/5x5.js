$(document).ready(function () {
  var mainsz = $('#mian-tz-sz'), //Get the map
    wfjs = $('#wfjs'), //Get the gameplay introduction button
    wf_js = $('#wf_js'), //Get an introduction to how to play
    tbool = true, //  Tbool judgement on whether to display or off Introduction to gameplay
    reset = $('#reset'); //Get a reset button
  TD_func.initmap(mainsz); // Initialise the element map and add squares to the map
  TD_func.my_tblr.init();

  reset.bind('click', function () {
    //Settings Replay button click event
    TD_func.copymap(TD_func.my_tzfa, TD_func.maps); //Empty the array
    $('#score')[0].innerHTML = '0'; //Set initialisation scores
    mainsz[0].innerHTML = ''; //Initialise numbers
    TD_func.initmap(mainsz); //Initialise element map
  });

  wfjs.bind('click', function () {
    //Settings Introduction to Click Events
    if (tbool) {
      $('#wf_js li').css('opacity', '1');
      tbool = false;
    } else {
      $('#wf_js li').css('opacity', '0');
      tbool = true;
    }
  });
});
document.onkeydown = function (event) {
  //Triggered events up and down, left and right
  var e = event || window.event || arguments.callee.caller.arguments[0];
  //Up and down, left and right //↑↓←→
  if (e && e.keyCode == 38) {
    //up
    event_func.runing('t');
    TD_func.my_tblr.active('↑');
  }
  if (e && e.keyCode == 40) {
    //down
    event_func.runing('d');
    TD_func.my_tblr.active('↓');
  }
  if (e && e.keyCode == 37) {
    //left
    event_func.runing('l');
    TD_func.my_tblr.active('←');
  }
  if (e && e.keyCode == 39) {
    //right
    event_func.runing('r');
    TD_func.my_tblr.active('→');
  }
};
//Encapsulation function
var event_func = {
  //What will happen by pressing the button
  e: [
    //Array of square events
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  runing: function (w) {
    switch (
      w //Up and down, left and right
    ) {
      case 't':
        Cube_fun.move(TD_func.my_tzfa, this.e, w);
        break;
      case 'd':
        Cube_fun.move(TD_func.my_tzfa, this.e, w);
        break;
      case 'l':
        Cube_fun.move(TD_func.my_tzfa, this.e, w);
        break;
      case 'r':
        Cube_fun.move(TD_func.my_tzfa, this.e, w);
        break;
      default:
    }
  },
};

var TD_func = {
  //公共使用
  opacity: 0.8, //Transparency of squares
  jd: 8, //Tilt to the side at an angle
  color: {
    //The colour of each number
    0: '255,255,255',
    1: '253,253,251',
    2: '251,250,227',
    4: '251,249,165',
    8: '252,203,148',
    16: '253,165,112',
    32: '254,123,103',
    64: '254,76,46',
    128: '251,220,110',
    256: '250,210,90',
    512: '249,200,70',
    1024: '248,190,50',
    2048: '247,180,30',
    4096: '246,170,10',
    8192: '245,150,0',
    16384: '244,120,0',
    32768: '243,90,0',
    65536: '242,60,0',
    131072: '241,30,0', 
    262144: '240,0,0', 
    524288: '250,10,10', 
    1048576: '255,22,23', 
    2097152: '255,46,49', 
    4194304: '255,80,100', 
    8388608: '255,110,150', 
    16777216: '255,160,220', 
    33554432: '255,200,255', 
    67108864: '255,100,255', 
    134217728: '255,0,255', 
    268435456: '191,0,191', 
    536870912: '128,0,128', 
    1073741824: '64,0,64', 
    2147483648: '0,0,0', 
  },
  maps: [
    //Map array is used to reset
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
  ],
  my_tzfa: [
    //Digital array of maps
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
  ],
  fontsize: {
    //Corresponds to the font size of each digit
    3: '50px',
    4: '36px',
    5: '30px',
    6: '26px',
    7: '22px',
    8: '20px',
    9: '18px',
    10: '16px',
  },
  mapsize: new Object(), //Record the map size
  ul: new Object(), //Use for recycling
  li: new Object(),
  copymap: function (a, b) {
    //Copy map
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        a[i][j] = b[i][j];
      }
    }
  },
  initmap: function (e) {
    //Initialize Add a block to the map
    var i,
      j,
      s,
      score = $('#scoretxt')[0];
    if (score.innerHTML == 'Game Over') {
      //Here, if the original gameover is changed to score.
      $(score).css('font-size', '30px');
      score.innerHTML = 'score:';
    }
    this.mapsize.w = parseInt(e.css('width')); //Record map height and width
    this.mapsize.h = parseInt(e.css('height'));
    for (i = 0; i < 5; i++) {
      for (j = 0; j < 5; j++) {
        s = this.my_tzfa[i][j];
        ul = this.create_TD(s); // The standard square gives ul a standard square.
        ul.appendTo(e); //Add to the map
        this.setindex(ul, i, j); //Set the position on the map and subscript of the array
        this.setcolor(ul); //Set the color
        $(ul).css('z-index', '2'); //Settings appear on Layer 2
        event_func.e[i][j] = ul;
        ul.x = 0 - this.jd;
        ul.y = this.jd; //Rotation angle
        if (s == '0') {
          //If it is "0", it will not be displayed. The settings are displayed in the first layer. The transparency is 0.
          $(ul).css('opacity', '0');
          $(ul).css('z-index', '1');
        }
      }
    }
    Cube_fun.addnumber(this.my_tzfa, event_func.e); //Randomly generate two numbers
    Cube_fun.addnumber(this.my_tzfa, event_func.e);
  },
  setcolor: function (e) {
    //Set the color and font size
    var str, i, color;
    str = this.my_tzfa[e.index_x][e.index_y]; //Get the number
    if (parseInt(str) >= 8) {
      //Change the font color greater than 8
      color = '#fffcf9';
    } else {
      color = '#753';
    }
    for (var i = 0; i < $(e).children().length; i++) {
      //Change color according to numbers
      $($(e).children()[i]).css({
        background: 'rgba(' + this.color[str] + ',' + TD_func.opacity + ')',
        color: color,
      }); //Color transparency
      //Set the transparency of the front to 1
      if ($(e).children().length - 1 == i)
        $($(e).children()[i]).css('background', 'rgba(' + this.color[str] + ',1)'); //Color transparency
      if ($($(e).children()[i])[0].innerHTML.length > 9) {
        //Set the font size
        $($(e).children()[i]).css('font-size', this.fontsize['10']);
      } else if ($($(e).children()[i])[0].innerHTML.length > 8) {
        $($(e).children()[i]).css('font-size', this.fontsize['9']);
      } else if ($($(e).children()[i])[0].innerHTML.length > 7) {
        $($(e).children()[i]).css('font-size', this.fontsize['8']);
      } else if ($($(e).children()[i])[0].innerHTML.length > 6) {
        $($(e).children()[i]).css('font-size', this.fontsize['7']);
      } else if ($($(e).children()[i])[0].innerHTML.length > 5) {
        $($(e).children()[i]).css('font-size', this.fontsize['6']);
      } else if ($($(e).children()[i])[0].innerHTML.length > 4) {
        $($(e).children()[i]).css('font-size', this.fontsize['5']);
      } else if ($($(e).children()[i])[0].innerHTML.length > 3) {
        $($(e).children()[i]).css('font-size', this.fontsize['4']);
      } else {
        $($(e).children()[i]).css('font-size', this.fontsize['3']);
      }
    }
  },
  setindex: function (e, a, b) {
    //Set the array subscript and position on the map
    e.index_x = a; //Remember the table below the array.
    e.index_y = b;
    $(e).css('left', b * (this.mapsize.w / 3) + 'px'); //Set the location on the map
    $(e).css('top', a * (this.mapsize.w / 3) + 'px');
  },
  create_TD: function (s) {
    //Create a standard 3D cube
    var i;
    this.ul = $("<ul class='ul tion1'/>");
    for (i = 0; i < 6; i++) $("<li class='li li" + (i + 1) + "'>" + s + '</li>').appendTo(this.ul);
    return this.ul;
  },
  my_tblr: {
    ul: new Object(),
    init: function () {
      //↑↓←→
      var ar = ['↑', '↓', '←', '→'],
        t,
        ft;
      function fun(tar) {
        if (tar == '↑') {
          ft = function () {
            event_func.runing('t');
          };
        }
        if (tar == '↓') {
          ft = function () {
            event_func.runing('d');
          };
        }
        if (tar == '←') {
          ft = function () {
            event_func.runing('l');
          };
        }
        if (tar == '→') {
          ft = function () {
            event_func.runing('r');
          };
        }
        return ft;
      }
      for (var i = 0; i < ar.length; i++) {
        ul[ar[i]] = t;
        t = $(this.create_TD(ar[i]));
        $('#my_tblr').append(t);
        t.bind('click', fun(ar[i]));
        t[0].className += ' pos' + (i + 1);
        ul[ar[i]] = t;
      }
    },
    create_TD: function (s) {
      //Create a standard 3D black cube
      var i;
      this.ul = $("<ul class='ul3 tion1'/>");
      for (i = 0; i < 6; i++)
        $("<li class='li_3 li3" + (i + 1) + "'>" + s + '</li>').appendTo(this.ul);
      return this.ul;
    },
    active: function (s) {
      $(ul[s][0]).addClass('ul3-active');
      setTimeout(function () {
        $(ul[s][0]).removeClass('ul3-active');
      }, 100);
    },
  },
};

var Cube_fun = {
  //Cube action, judgment, etc.
  //For mobile use
  xxx: true, //Judgment
  map_run: [
    //The number array of maps is used to determine whether to move or not.
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
  ],
  jh: function (e, map, x1, y1, x2, y2) {
    //Exchange
    var t;
    t = e[x1][y1]; //Exchange Event Objects
    e[x1][y1] = e[x2][y2];
    e[x2][y2] = t;

    t = map[x1][y1]; //Exchange Digital Array
    map[x1][y1] = map[x2][y2];
    map[x2][y2] = t;
  },
  jhz: function (e, map, x1, y1, x2, y2) {
    //The left is equal to the sum of two, the right is set to 0, and the right is reset square css.
    var score = $('#score')[0],
      fzz = $('#mian-tz-fzz')[0],
      fs = $('#mian-tz-fs')[0];
    map[x1][y1] = parseInt(map[x1][y1]) + parseInt(map[x2][y2]) + ''; //Set the first score
    map[x2][y2] = '0'; //Reset the second score

    score.innerHTML = parseInt($('#score')[0].innerHTML) + parseInt(map[x1][y1]); //Change the score
    fzz.className = 'ulli2'; //Change class
    fs.className = 'ulli2'; //Change class
    setTimeout(function () {
      fzz.className = 'ulli'; //Change class
      fs.className = 'ulli'; //Change class
    }, 100);

    for (var i = 0; i < $(e[x1][y1]).children().length; i++) {
      //Change the first innerhtml
      $($(e[x1][y1]).children()[i])[0].innerHTML = map[x1][y1]; //Set up innerhtml
    }
    TD_func.setcolor(e[x1][y1]);
    setTimeout(function () {
      for (var i = 0; i < $(e[x2][y2]).children().length; i++) {
        //Change the innerhtml of the second one
        $($(e[x2][y2]).children()[i])[0].innerHTML = map[x2][y2]; //Set up innerhtml
      }
      TD_func.setcolor(e[x2][y2]);
    }, 100);
    $(e[x2][y2]).css('opacity', '0'); //Disappear
  },
  addnumber: function (map, e) {
    //Randomised generation 2 and 4
    var x = Math.floor(Math.random() * 4);
    var y = Math.floor(Math.random() * 4);
    var number = Math.floor(Math.random() * 20);
    number = number == 0 ? 4 : 2; //One of 20 points is 4 Other 2
    while (map[x][y] != '0') {
      //Randomly generated in map location If the map location number is not 0, then re-randomised position
      x = Math.floor(Math.random() * 4);
      y = Math.floor(Math.random() * 4);
    }
    map[x][y] = number + ''; //Assign the digital array map
    for (var i = 0; i < $(e[x][y]).children().length; i++) {
      //设置innerhtml
      $($(e[x][y]).children()[i])[0].innerHTML = map[x][y];
    }
    TD_func.setcolor(e[x][y]); //Set the colour
    $(e[x][y]).css('opacity', '1'); //Show
  },
  run_deg: function (e, a, s) {
    //Rotate
    switch (s) {
      case 't':
        e.x += a * 360;
        break;
      case 'd':
        e.x -= a * 360;
        break;
      case 'l':
        e.y -= a * 360;
        break;
      case 'r':
        e.y += a * 360;
        break;
      default:
    }
    $(e).css('transform', ' rotateX(' + e.x + 'deg) rotateY(' + e.y + 'deg)');
  },
  run_px: function (e, s) {
    //For moving
    switch (s) {
      case 't':
        e.index_x--;
        break;
      case 'd':
        e.index_x++;
        break;
      case 'l':
        e.index_y--;
        break;
      case 'r':
        e.index_y++;
        break;
      default:
    }
    parseInt($(e).css('top', (e.index_x * TD_func.mapsize.h) / 3 + 'px'));
    parseInt($(e).css('left', (e.index_y * TD_func.mapsize.w) / 3 + 'px'));
  },
  isGameover: function (e) {
    //Up and down, left and right. If there is no adjacent equality, just GAver.
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 3; j++) {
        if (e[i][j] == e[i][j + 1])
          //If there is the same, there is no Gameover.
          return true;
      }
    }
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 4; j++) {
        if (e[i][j] == e[i + 1][j])
          //If there is the same, there is no Gameover.
          return true;
      }
    }
    return false;
  },
  isrun: function (a, b) {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (a[i][j] != b[i][j])
          //One difference is moving.
          return true;
      }
    }
    return false;
  },
  isFull: function (map) {
    //Judgement is full.
    for (var i = 0; i < map.length; i++)
      for (var j = 0; j < map[0].length; j++) {
        if (map[i][j] == '0') {
          return false;
        }
      }
    return true;
  },
  move: function (map, e, w) {
    //Move the direction parameters of digital map object map w
    TD_func.copymap(this.map_run, TD_func.my_tzfa); //Record the previous array
    switch (w) {
      case 't':
        this.top_removeblank(map, e);
        this.top_remove(map, e);
        this.top_removeblank(map, e);
        break;
      case 'd':
        this.down_removeblank(map, e);
        this.down_remove(map, e);
        this.down_removeblank(map, e);
        break;
      case 'l':
        this.left_removeblank(map, e);
        this.left_remove(map, e);
        this.left_removeblank(map, e);
        break;
      case 'r':
        this.right_removeblank(map, e);
        this.right_remove(map, e);
        this.right_removeblank(map, e);
        break;
      default:
    }
    if (!this.isFull(map) && this.isrun(this.map_run, TD_func.my_tzfa)) {
      //If it's not full and move, add the number.
      this.addnumber(map, e);
    } else if (!this.isGameover(TD_func.my_tzfa)) {
      //JUDGE GAME OVER
      if (!this.isFull(map)) {
        return;
      }
      var score = $('#scoretxt')[0],
        fs = $('#mian-tz-fs')[0];
      $(score).css('font-size', '23px');
      score.innerHTML = 'Game Over';
      fs.className = 'ulli2'; //Change the class dynamic effect
      setTimeout(function () {
        fs.className = 'ulli'; //Change class
      }, 100);
    }
  },
  top_removeblank: function (map, e) {
    var i, j, k;
    for (i = 0; i < 4; i++) {
      for (j = 1; j < 4; j++) {
        k = j;
        while (k - 1 >= 0 && map[k - 1][i] == '0') {
          this.run_px(e[k][i], 't');
          this.run_px(e[k - 1][i], 'd');
          this.run_deg(e[k][i], 1, 't');
          this.run_deg(e[k - 1][i], 1, 'd');
          this.jh(e, map, k, i, k - 1, i); //Change the map array and e object array
          k--;
        }
      }
    }
  },
  down_removeblank: function (map, e) {
    var i, j, k;
    for (j = 0; j < 4; j++) {
      for (i = 2; i >= 0; i--) {
        k = i;
        while (k + 1 <= 3 && map[k + 1][j] == '0') {
          this.run_px(e[k][j], 'd');
          this.run_px(e[k + 1][j], 't');
          this.run_deg(e[k][j], 1, 'd');
          this.run_deg(e[k + 1][j], 1, 't');
          this.jh(e, map, k, j, k + 1, j);
          k++;
        }
      }
    }
  },
  left_removeblank: function (map, e) {
    var i, j, k;
    for (i = 0; i < 4; i++) {
      for (j = 1; j < 4; j++) {
        k = j;
        while (k - 1 >= 0 && map[i][k - 1] == '0') {
          this.run_px(e[i][k], 'l');
          this.run_px(e[i][k - 1], 'r');
          this.run_deg(e[i][k], 1, 'l');
          this.run_deg(e[i][k - 1], 1, 'r');
          this.jh(e, map, i, k, i, k - 1);
          k--;
        }
      }
    }
  },
  right_removeblank: function (map, e) {
    var i, j, k;
    for (i = 0; i < 4; i++) {
      for (j = 2; j >= 0; j--) {
        k = j;
        while (k + 1 <= 3 && map[i][k + 1] == '0') {
          this.run_px(e[i][k], 'r');
          this.run_px(e[i][k + 1], 'l');
          this.run_deg(e[i][k], 1, 'r');
          this.run_deg(e[i][k + 1], 1, 'l');
          this.jh(e, map, i, k, i, k + 1);
          k++;
        }
      }
    }
  },

  top_remove: function (map, e) {
    var i, j;
    for (j = 0; j < 4; j++) {
      for (i = 0; i < 3; i++) {
        if (map[i + 1][j] == map[i][j] && map[i + 1][j] != '0') {
          //相等
          this.run_px(e[i + 1][j], 't'); //右边的向左移动
          this.run_deg(e[i + 1][j], 1, 't'); //右边的向左旋转
          this.jhz(e, map, i, j, i + 1, j);
          this.run_px(e[i + 1][j], 'd');
          this.run_deg(e[i + 1][j], 1, 'd');
        }
      }
    }
  },
  down_remove: function (map, e) {
    var i, j;
    for (j = 0; j < 4; j++) {
      for (i = 3; i > 0; i--) {
        if (map[i - 1][j] == map[i][j] && map[i - 1][j] != '0') {
          //相等
          this.run_px(e[i - 1][j], 't'); //右边的向左移动
          this.run_deg(e[i - 1][j], 1, 't'); //右边的向左旋转
          this.jhz(e, map, i, j, i - 1, j);
          this.run_px(e[i - 1][j], 'd');
          this.run_deg(e[i - 1][j], 1, 'd');
        }
      }
    }
  },
  left_remove: function (map, e) {
    var i, j;
    for (i = 0; i < 4; i++) {
      for (j = 0; j < 3; j++) {
        if (map[i][j] == map[i][j + 1] && map[i][j] != '0') {
          //相等
          this.run_px(e[i][j + 1], 'l'); //右边的向左移动
          this.run_deg(e[i][j + 1], 1, 'l'); //右边的向左旋转
          this.jhz(e, map, i, j, i, j + 1);
          this.run_px(e[i][j + 1], 'r');
          this.run_deg(e[i][j + 1], 1, 'r');
        }
      }
    }
  },
  right_remove: function (map, e) {
    var i, j;
    for (i = 0; i < 4; i++) {
      for (j = 3; j > 0; j--) {
        if (map[i][j] == map[i][j - 1] && map[i][j] != '0') {
          //相等
          this.run_px(e[i][j - 1], 'r'); //右边的向左移动
          this.run_deg(e[i][j - 1], 1, 'r'); //右边的向左旋转
          this.jhz(e, map, i, j, i, j - 1);
          this.run_px(e[i][j - 1], 'l');
          this.run_deg(e[i][j - 1], 1, 'l');
        }
      }
    }
  },
}; //数组等于0 并且不是边界的时候移动
