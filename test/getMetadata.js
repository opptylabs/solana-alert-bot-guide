const assert = require('assert');
const {getMetadata} = require("../src/getMetadata");

describe('getMetadata', function () {
    this.timeout(10000);
    if (process.env.HELIUS_API_KEY) {
        it('should return data',  function (done) {
            const mint = 'BcsFrtPNc62G9aFwQdRPtk8xoZCkuQMCJTDyy7ay51CE'
            getMetadata(mint)
                .then(data => {
                    assert.equal(data.mint, mint)
                    assert.ok(data.offChainData.image)
                    done()
                })
                .catch(err => {
                    done(err)
                })
        });

        it('should return null',  function (done) {
            getMetadata()
                .then(data => {
                    assert.equal(data, null)
                    done()
                })
                .catch(err => {
                    done(err)
                })
        });
    } else {
        it('HELIUS_API_KEY is not set.')
    }
});