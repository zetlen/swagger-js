// Generated by IcedCoffeeScript 1.2.0q
(function() {

  window.context = window.describe;

  window.xcontext = window.xdescribe;

  describe('Api', function() {
    describe('constructor', function() {
      describe('defaults', function() {
        beforeEach(function() {
          window.wordnik = new Api();
          return waitsFor(function() {
            return wordnik;
          });
        });
        it("sets the default discoveryUrl to wordnik's production API", function() {
          return runs(function() {
            return expect(wordnik.discoveryUrl).toBe("http://api.wordnik.com/v4/resources.json");
          });
        });
        it("disables the debugger by default", function() {
          return runs(function() {
            return expect(wordnik.debug).toBe(false);
          });
        });
        return it("sets the default format to JSON", function() {
          return runs(function() {
            return expect(wordnik.format).toBe('json');
          });
        });
      });
      return describe('customization', function() {
        beforeEach(function() {
          window.unicornApi = new Api({
            discoveryUrl: "http://unicorns.com",
            debug: true,
            apiKey: 'stardust'
          });
          return waitsFor(function() {
            return unicornApi;
          });
        });
        it("allows discoveryUrl to be set", function() {
          return runs(function() {
            return expect(unicornApi.discoveryUrl).toBe("http://unicorns.com");
          });
        });
        it("allows debugging to be enabled", function() {
          return runs(function() {
            return expect(unicornApi.debug).toBe(true);
          });
        });
        return it("converts apiKey to api_key", function() {
          return runs(function() {
            return expect(unicornApi.api_key).toBe('stardust');
          });
        });
      });
    });
    return describe('build', function() {
      beforeEach(function() {
        window.wordnik = new Api;
        wordnik.build();
        return waitsFor(function() {
          return wordnik.isReady();
        });
      });
      it("fetchs a list of resources", function() {
        return runs(function() {
          return expect(wordnik.resources.length).toBeGreaterThan(0);
        });
      });
      it("sets basePath", function() {
        return runs(function() {
          return expect(wordnik.basePath).toBe("http://api.wordnik.com/v4");
        });
      });
      return it("creates named references to its resources", function() {
        return runs(function() {
          return expect(wordnik.words).toBeDefined();
        });
      });
    });
  });

  describe('Resource', function() {
    beforeEach(function() {
      window.wordnik = new Api();
      wordnik.build();
      return waitsFor(function() {
        return wordnik.isReady();
      });
    });
    it("has a url()", function() {
      return runs(function() {
        var resource;
        resource = wordnik.resources[0];
        return expect(resource.url()).toMatch(/\.json$/);
      });
    });
    it("has a name() method which is inferred from its path", function() {
      return runs(function() {
        var resource;
        resource = new Resource("/word.{format}", "an imaginary resource", wordnik);
        return expect(resource.name()).toEqual('word');
      });
    });
    return it("creates named references to its operations", function() {
      return runs(function() {
        var resource;
        resource = wordnik.word;
        return expect(resource.getDefinitions).toBeDefined();
      });
    });
  });

  describe('Operation', function() {
    beforeEach(function() {
      window.wordnik = new Api();
      wordnik.build();
      return waitsFor(function() {
        return wordnik.isReady();
      });
    });
    describe("urlFor", function() {
      describe("path params", function() {
        beforeEach(function() {
          return runs(function() {
            window.operation = wordnik.word.getDefinitions;
            operation.path = "/my/{foo}/kaboo";
            operation.parameters = [
              {
                paramType: 'path',
                name: 'foo'
              }
            ];
            return window.args = {
              foo: 'pee'
            };
          });
        });
        it("injects path params into the path", function() {
          return runs(function() {
            return expect(operation.urlFor(args)).toMatch(/\/pee\/kaboo/);
          });
        });
        return it("throws an exception if path has unmatched params", function() {
          return runs(function() {
            var args;
            args = {};
            return expect(function() {
              return operation.urlFor(args);
            }).toThrow("foo is a required path param.");
          });
        });
      });
      return describe("API key", function() {
        beforeEach(function() {
          return runs(function() {
            return wordnik.word.getDefinitions.parameters = {};
          });
        });
        it("includes API key in URL if it's present", function() {
          return runs(function() {
            wordnik.api_key = 'xyz';
            return expect(wordnik.word.getDefinitions.urlFor({})).toMatch(/api_key=xyz/);
          });
        });
        return it("doesn't include API key in URL if it's null", function() {
          return runs(function() {
            wordnik.api_key = null;
            return expect(wordnik.word.getDefinitions.urlFor({})).not.toMatch(/api_key/);
          });
        });
      });
    });
    return describe("run", function() {
      return it("runs", function() {
        return runs(function() {
          var args, res,
            _this = this;
          args = {
            word: 'flagrant',
            limit: 3
          };
          res = null;
          wordnik.word.getDefinitions.run(args, function(response) {
            return res = response;
          });
          waitsFor(function() {
            return res != null;
          });
          return runs(function() {
            return expect(res.foo).toBe('bar');
          });
        });
      });
    });
  });

}).call(this);