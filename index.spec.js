/* eslint max-nested-callbacks:0 */
'use strict';

const assert = require('assert');
const urlRootDomain = require('./index');

describe('urlExtractRoot', () => {

  describe('when parsing an url with an ip', () => {
    it('should return null', () => {
      assert.deepEqual(
        urlRootDomain('http://0.0.0.0/link'),
        '',
        'ipv4 not catched'
      );
      assert.deepEqual(
        urlRootDomain('http://[::1]/link'),
        '',
        'ipv6 not catched'
      );
    });
  });

  [
    'my-domain.com',
    'a.fr',
    'my-domain.co.uk',
  ].forEach((domain) => {
    describe('when parsing a HTTP url', () => {
      it(`should return ${domain}`, () => {
        assert.deepEqual(
          urlRootDomain(`http://${domain}/link`),
          domain
        );
      });

      describe('with a subdomain', () => {
        const subdomain = 'subdmain';

        it(`should return ${domain}`, () => {
          assert.deepEqual(
            urlRootDomain(`http://${subdomain}.${domain}/link`),
            domain
          );
        });
      });
    });

    describe('when parsing a HTTPS url', () => {
      it(`should return ${domain}`, () => {
        assert.deepEqual(
          urlRootDomain(`https://${domain}/link`),
          domain
        );
      });

      describe('with a subdomain', () => {
        const subdomain = 'subdmain';

        it(`should return ${domain}`, () => {
          assert.deepEqual(
            urlRootDomain(`https://${subdomain}.${domain}/link`),
            domain
          );
        });
      });
    });

  });

});
