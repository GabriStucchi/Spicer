
      /**
       * Just a lazy way to convert all inputs into knobs.
       * Normally you would write `new Knob(document.getElementById('someIdHere'), new Ui.P1());` to create a knob.
       */

      for (var i = 1; i < 6; i++) {
          Array.prototype.slice.call(document.getElementsByClassName('preset' + i)).forEach(function(el) {
              new Knob(el, new Ui['P' + i]());
              el.addEventListener('change', function  () {
                console.log(el.value)
              })
          })
      }

      /**
       * Create a simple slider with just a scale
       */
      var ScaleExample = function() {};

      ScaleExample.prototype = Object.create(Ui.prototype);

      ScaleExample.prototype.createElement = function() {

          Ui.prototype.createElement.apply(this, arguments);
          this.addComponent(new Ui.Scale({
              drawScale: true,
              drawDial: false,
              steps: 30,
              tickWidth: 10,
              tickHeight: 10,
              type: 'Triangle'
          }));
          this.el.node.setAttribute("class", "scaleExample");
      }

      new Knob(document.getElementsByClassName('scaleExample')[0], new ScaleExample());

      /**
       * Create a simple slider with just a dial
       */
      var DialExample = function() {};

      DialExample.prototype = Object.create(Ui.prototype);

      DialExample.prototype.createElement = function() {

          Ui.prototype.createElement.apply(this, arguments);
          this.addComponent(new Ui.Scale({
              drawScale: false,
              drawDial: true,
              steps: 10
          }));
          this.el.node.setAttribute("class", "dialExample");
      };
      new Knob(document.getElementsByClassName('dialExample')[0], new DialExample());

      /**
       * Create a simple slider with just a pointer
       */
      var PointerExample = function() {};

      PointerExample.prototype = Object.create(Ui.prototype);

      PointerExample.prototype.createElement = function() {

          Ui.prototype.createElement.apply(this, arguments);
          this.addComponent(new Ui.Pointer({
              type: 'Circle',
              pointerWidth: 3,
              pointerHeight: this.width / 5,
              offset: this.width / 2 - this.width / 3.3 - this.width / 10
          }));
          this.el.node.setAttribute("class", "pointerExample");
      };
      new Knob(document.getElementsByClassName('pointerExample')[0], new PointerExample());

      /**
       * Create a simple slider with just an acr
       */
      var Arcxample = function() {};

      Arcxample.prototype = Object.create(Ui.prototype);

      Arcxample.prototype.createElement = function() {

          Ui.prototype.createElement.apply(this, arguments);
          this.addComponent(new Ui.Arc({
              arcWidth: this.width / 10
          }));
          this.el.node.setAttribute("class", "arcExample");
      };
      new Knob(document.getElementsByClassName('arcExample')[0], new Arcxample());
