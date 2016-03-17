// Notes:
    //   - All of Norvig's original numbers were from 2002
    //   - Any numbers without a citation are from Norvig's article:
    //       http://norvig.com/21-days.html#answers
    //   - Exponential functions have the form:
    //       y = a*b^x
    //   - raising 2^2012 causes overflow, so we index year by (year - 1982)
    //     (82 was the year the PC came out)
    // TODO: get more accurate doubling rates from Aurojit Panda's
    //       spreadsheet: http://www.eecs.berkeley.edu/~rcs/research/hw_trends.xlsx

    var year = 2012;
    function shift(year) {
        return year - 1982;
    }
    function getPayloadBytes() {
        // 1 MB
        return Math.pow(10, 6);
    }
    function getNetworkPayloadBytes() {
        // 2KB
        return 2 * Math.pow(10,3);
    }
    function getCycle() {
        // Clock speed stopped at ~3GHz in ~2005
        // [source: http://www.kmeme.com/2010/09/clock-speed-wall.html]
        // Before then, doubling every ~2 years
        // [source: www.cs.berkeley.edu/~pattrsn/talks/sigmod98-keynote.ppt]
        if (year <= 2005) {
          // 3*10^9 = a*b^(2005-1990)
          // b = 2^(1/2)
          // -> a = 3*10^9 / 2^(2005.5)
          var a = 3 * Math.pow(10, 9) / Math.pow(2,shift(2005) * 0.5);
          var b = Math.pow(2, 1.0/2);
          var hz = a * Math.pow(b, shift(year));
        } else {
          var hz = 3 * Math.pow(10,9);
        }
        //  1 / HZ = seconds
        //  1*10^9 / HZ = ns
        var ns = Math.pow(10,9) / hz;
        return ns;
    }
    function getMemLatency() {
        // Bus Latency is actually getting worse:
        // [source: http://download.micron.com/pdf/presentations/events/winhec_klein.pdf]
        // 15 years ago, it was decreasing 7% / year
        // [source: www.cs.berkeley.edu/~pattrsn/talks/sigmod98-keynote.ppt]
        if (year <= 2000) {
           // b = 0.93
           // 100ns = a*0.93^2000
           /// -> a = 100 / 0.93^2000
           var b = 0.93;
           var a = 100.0 / Math.pow(0.93,shift(2000));
           var ms = a * Math.pow(b, shift(year));
        } else {
           var ms = 100; // ns
        }
        return ms;
    }
    function getNICTransmissionDelay(payloadBytes) {
        // NIC bandwidth doubles every 2 years
        // [source: http://ampcamp.berkeley.edu/wp-content/uploads/2012/06/Ion-stoica-amp-camp-21012-warehouse-scale-computing-intro-final.pdf]
        // TODO: should really be a step function
        // 1Gb/s = 125MB/s = 125*10^6 B/s in 2003
        // 125*10^6 = a*b^x
        // b = 2^(1/2)
        // -> a = 125*10^6 / 2^(2003.5)
        var a = 125 * Math.pow(10,6) / Math.pow(2,shift(2003) * 0.5);
        var b = Math.pow(2, 1.0/2);
        var bw = a * Math.pow(b, shift(year));
        // B/s * s/ns = B/ns
        var ns = payloadBytes / (bw / Math.pow(10,9));
        return ns;
    }
    function getBusTransmissionDelay(payloadBytes) {
        // DRAM bandwidth doubles every 3 years
        // [source: http://ampcamp.berkeley.edu/wp-content/uploads/2012/06/Ion-stoica-amp-camp-21012-warehouse-scale-computing-intro-final.pdf]
        // 1MB / 250,000 ns = 10^6B / 0.00025 = 4*10^9 B/s in 2001
        // 4*10^9 = a*b^x
        // b = 2^(1/3)
        // -> a = 4*10^9 / 2^(2001.33)
        var a = 4*Math.pow(10, 9) / Math.pow(2,shift(2001) * 0.33);
        var b = Math.pow(2,1.0/3);
        var bw = a * Math.pow(b, shift(year));
        // B/s * s/ns = B/ns
        var ns = payloadBytes / (bw / Math.pow(10,9));
        return ns;
    }
    function getSSDLatency() {
        // Will flat-line in one capacity doubling cycle (18 months=1.5years)
        // Before that, 20X decrease in 3 doubling cycles (54 months=4.5years)
        // Source: figure 4 of http://cseweb.ucsd.edu/users/swanson/papers/FAST2012BleakFlash.pdf
        // 20 us = 2*10^4 ns in 2012
        // b = 1/20 ^ 1/4.5
        // -> a = 2*10^4 / 1/20 ^(2012 * 0.22)
        if (year <= 2014) {
           var a = 2 * Math.pow(10,4) / Math.pow(1.0/20, shift(year) * 0.22);
           var b = Math.pow(1.0/20, 1.0/4.5);
           return a * Math.pow(b,shift(year));
        } else {
           return 16000;
        }
    }
    function getSSDTransmissionDelay(payloadBytes) {
        // SSD bandwidth doubles every 3 years
        // [source: http://ampcamp.berkeley.edu/wp-content/uploads/2012/06/Ion-stoica-amp-camp-21012-warehouse-scale-computing-intro-final.pdf]
        // 3GB/s = a*b^2012
        // b = 2^(1/3)
        // -> a = 6*10^9 / 2^(2012.33)
        var a = 3*Math.pow(10, 9) / Math.pow(2,shift(2012) * 0.33);
        var b = Math.pow(2, 1.0/3);
        var bw = a*Math.pow(b, shift(year));
        // B/s * s/ns = B/ns
        var ns = payloadBytes / (bw / Math.pow(10,9));
        return ns;
    }
    function getSeek() {
        // Seek + rotational delay halves every 10 years
        // [source: http://www.storagenewsletter.com/news/disk/hdd-technology-trends-ibm]
        // In 2000, seek + rotational =~ 10 ms
        // b = (1/2)^(1/10)
        // -> a = 10^7 / (1/2)^(2000*0.1)
        var a = Math.pow(10,7) / Math.pow(0.5,shift(2000)*0.1);
        var b = Math.pow(0.5,0.1);
        var ns = a * Math.pow(b, shift(year));
        return ns;
    }
    function getDiskTransmissionDelay(payloadBytes) {
        // Disk bandwidth is increasing very slowly -- doubles every ~5 years
        // [source: http://ampcamp.berkeley.edu/wp-content/uploads/2012/06/Ion-stoica-amp-camp-21012-warehouse-scale-computing-intro-final.pdf]
        // Before 2002 (~100MB/s):
        // Disk bandwidth doubled every two years
        // [source: www.cs.berkeley.edu/~pattrsn/talks/sigmod98-keynote.ppt]
        if (year <= 2002) {
          // 100MB/s = a*b^2002
          // b = 2^(1/2)
          // -> a = 10^8 / 2^(2002.5)
          var a = Math.pow(10,8) / Math.pow(2,shift(2002) * 0.5);
          var b = Math.pow(2,1.0/2);
          var bw = a * Math.pow(b, shift(year));
        } else {
          // 100MB/s = a*b^2002
          // b = 2^(1/5)
          // -> a = 10^8 / 2^(2002-1982 * .2)
          var a = Math.pow(10,8) / Math.pow(2,shift(2002) * 0.2);
          var b = Math.pow(2,1.0/5);
          var bw = a * Math.pow(b, shift(year));
        }
        // B/s * s/ns = B/ns
        var ns = payloadBytes / (bw / Math.pow(10,9));
        return ns;
    }
    function getDCRTT() {
        // Assume this doesn't change much?
        return 500000; // ns
    }
    function getWanRTT() {
        // Routes are arguably improving:
        //   http://research.google.com/pubs/pub35590.html
        // Speed of light is ultimately fundamental
        return 150000000; // ns
    }

    // Display functions:
    function drawBoxes(n, div, color) {
        var cw = 100;
        var ch = (n / 10) * 10;
        if ((n % 10) != 0) {
          ch += 10;
        }
        var rects = d3.select("#" + div).
         append("svg:svg").
         attr("width", cw).
         attr("height", ch);

        var length = 10;
        var whitespace = 2;

        for (var y = 0; y < ch; y+=length) {
            for (var x = 0; x < cw; x+=length) {
                if (n > 0 && n < 1) {
                  var width = n * length;
                } else {
                  var width = length;
                }
                rects.append("svg:rect").
                  attr("x", x).
                  attr("y", y).
                  attr("height", length).
                  attr("width", width).
                  attr("style", color);

                n -= 1;
                if (n <= 0) {
                   return;
                }
            }
        }
    }

    function singleBox(color) {
        s = '<svg width="11" height="11">';
        s += '<rect x="0" y="0" height="10" width="10" style="';
        s += color + '"></rect>';
        s += '</svg>';
        return s;
    }

    var black = "stroke:#FFFFFF; fill: #000000";
    var blue = "stroke:#FFFFFF; fill: #0000FF";
    var green = "stroke:#FFFFFF; fill: #00CC00";
    var red = "stroke:#FFFFFF; fill: #FF0000";

    function addCommas(nStr) {
      // First, make fixed length
      // TODO: bad separation of concerns
      if (nStr < 1) {
          nStr = nStr.toFixed(1);
      } else {
          nStr = nStr.toFixed(0);
      }
      nStr += '';
      x = nStr.split('.');
      x1 = x[0];
      x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }
      return x1 + x2;
    }

    function Metric(ns, boxType, displayString, div, optionalSuffix) {
        this.ns = ns;
        if (boxType == "ns") {
          this.color = black;
          this.boxes = ns;
          this.nsDisplay = addCommas(ns);
          this.alternateUnit = "";
        } else if (boxType == "100ns") {
          this.color = blue;
          this.boxes = ns / 100;
          var us = ns / 1000;
          if (us >= 1) {
            this.nsDisplay = addCommas(Math.round(ns / 1000) * 1000);
            this.alternateUnit = " ?" + addCommas(ns / 1000) + "祍";
          } else {
            this.nsDisplay = addCommas(ns);
            this.alternateUnit = "";
          }
        } else if (boxType == "10us") {
          this.color = green;
          this.boxes = ns / 10000;
          this.nsDisplay = addCommas(Math.round(ns / 1000) * 1000);
          if (displayString != "") {
             this.alternateUnit = " ?" + addCommas(ns / 1000) + "祍";
          } else {
             this.alternateUnit = " = 1ms";
          }
        } else if (boxType == "ms") {
          this.color = red;
          this.boxes = ns * Math.pow(10, -6);
          var ms = ns * Math.pow(10, -6);
          if (ms >= 1) {
            this.nsDisplay = addCommas(Math.round(ns / 1000000) * 1000000);
            this.alternateUnit = " ?" + addCommas(ns / 1000000) + "ms";
          } else {
            this.nsDisplay = addCommas(Math.round(Math.max(ns / 100000,1)) * 100000);
            this.alternateUnit = "";
          }
        }

        if (typeof optionalSuffix === "undefined") {
          optionalSuffix = "";
        }
        this.displayString = (displayString + this.nsDisplay + "ns" +
                              this.alternateUnit + " " + optionalSuffix);
        this.div = div;
        this.fillDiv = function() {
          document.getElementById(this.div).innerHTML = "";
          drawBoxes(this.boxes, this.div, this.color);
          document.getElementById(this.div + "t").innerHTML = this.displayString;
        }
    }

    function getMetrics() {
        var ns = new Metric(1, "ns", "", "ns");
        // Source for L1: http://cache.freescale.com/files/32bit/doc/app_note/AN2180.pdf
        var L1 = new Metric(3*getCycle(), "ns", "L1 cache reference: ", "L1");
        var branch = new Metric(10*getCycle(), "ns", "Branch mispredict: ", "branch");
        // Source for L2: http://cache.freescale.com/files/32bit/doc/app_note/AN2180.pdf
        var L2 = new Metric(13*getCycle(), "ns", "L2 cache reference: ", "L2");
        var mutex = new Metric(50*getCycle(), "ns", "Mutex lock/unlock: ", "mutex");
        var ns100 = new Metric(100, "ns", "", "ns100", ' = ' + singleBox(blue));
        var mem = new Metric(getMemLatency(), "100ns", "Main memory reference: ", "mem");
        var micro = new Metric(100*10, "100ns", "", "micro");
        var zippy = new Metric(6000 * getCycle(), "100ns", "Compress 1KB wth Zippy: ",
                               "zippy");
        var tenMicro = new Metric(100*100, "100ns", "", "tenMicro", ' = ' + singleBox(green));
        var network = new Metric(getNICTransmissionDelay(getNetworkPayloadBytes()), "10us",
              "Send " + addCommas(getNetworkPayloadBytes()) + " bytes over commodity network: ", "network");
        var ssdRandom = new Metric(getSSDLatency(), "10us", "SSD random read: ", "ssdRandom");
        var mbMem = new Metric(getBusTransmissionDelay(getPayloadBytes()), "10us",
                                "Read " + addCommas(getPayloadBytes()) + " bytes sequentially from memory: ", "mbMem");
        var rtt = new Metric(getDCRTT(), "10us", "Round trip in same datacenter: ", "rtt");
        var ms = new Metric(100*100*100, "10us", "", "ms", ' = ' + singleBox(red));
        var mbSSD = new Metric(getSSDTransmissionDelay(getPayloadBytes()), "ms",
                               "Read " + addCommas(getPayloadBytes()) + " bytes sequentially from SSD: ", "mbSSD");
        var seek = new Metric(getSeek(), "ms", "Disk seek: ", "seek");
        var mbDisk = new Metric(getDiskTransmissionDelay(getPayloadBytes()), "ms",
                                "Read " + addCommas(getPayloadBytes()) + " bytes sequentially from disk: ", "mbDisk");
        var wan = new Metric(getWanRTT(), "ms", "Packet roundtrip CA to Netherlands: ", "wan");
        var metrics = new Array(ns,L1,branch,L2,mutex,ns100,mem,micro,zippy,tenMicro,network,
                               ssdRandom,mbMem,rtt,ms,mbSSD,seek,mbDisk,wan);
        return metrics;
    }

    <!-- Slider: -->
    $(function() {
        $( "#slider" ).slider({
            value: year,
            min: 1990,
            max: 2020,
            step: 1,
            slide: function( event, ui ) {
                $( "#amount" ).val( ui.value );
                year = ui.value;
                render();
            }
        });
        $( "#amount" ).val( $( "#slider" ).slider( "value" ) );
    });