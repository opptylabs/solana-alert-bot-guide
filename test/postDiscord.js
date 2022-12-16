const assert = require('assert');
const {postDiscord} = require("../src/postDiscord");

describe('postDiscord', function () {
    this.timeout(10000);
    if (process.env.DISCORD_WEBHOOK_URL) {
        it('should return 204', function (done) {
            postDiscord({
                'signature': 'TESTSIGNATURE',
                'type': 'TESTTYPE',
                'description': 'TEST DESCRIPTION',
                'link': 'https://opptylabs.com',
                'nft': {
                    'image': 'https://metadata.degods.com/g/3190-dead.png',
                    'name': 'DeGod'
                }
            })
            .then(res => {
                assert.equal(res.status, 204);
                done()
            })
            .catch(err => {
                done(err)
            })
        });
        it('should return 204', function (done) {
            postDiscord({
                'signature': 'TESTSIGNATURE',
                'type': 'TESTTYPE',
                'description': 'TEST DESCRIPTION',
            })
                .then(res => {
                    assert.equal(res.status, 204);
                    done()
                })
                .catch(err => {
                    done(err)
                })
        });
    } else {
        it('DISCORD_WEBHOOK_URL is not set.')
    }
});