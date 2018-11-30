import log from '../helper/Log';
import Test from '../helper/Test';
import Loader from '../../src/utils/Loader';
import { TextureManager, RenderManager } from '../../src/entry';

const GlyphInfo = {
    height: 19,
    'a': {
        row: 0,
        width: 11,
        x: 0,
    },
    'b': {
        row: 0,
        width: 11,
        x: 12,
    },
    'c': {
        row: 0,
        width: 11,
        x: 24,
    },
    'd': {
        row: 0,
        width: 11,
        x: 36,
    },
    'e': {
        row: 0,
        width: 11,
        x: 48,
    },
    'f': {
        row: 0,
        width: 11,
        x: 60,
    },
    'g': {
        row: 0,
        width: 11,
        x: 72,
    },
    'h': {
        row: 0,
        width: 11,
        x: 84,
    },
    'i': {
        row: 0,
        width: 5,
        x: 96,
    },
    'j': {
        row: 0,
        width: 6,
        x: 108,
    },
    'k': {
        row: 0,
        width: 11,
        x: 120,
    },
    'l': {
        row: 0,
        width: 5,
        x: 132,
    },
    'm': {
        row: 0,
        width: 11,
        x: 144,
    },
    'n': {
        row: 0,
        width: 11,
        x: 156,
    },
    'o': {
        row: 0,
        width: 11,
        x: 168,
    },
    'p': {
        row: 0,
        width: 11,
        x: 180,
    },
    'q': {
        row: 0,
        width: 11,
        x: 192,
    },
    'r': {
        row: 0,
        width: 10,
        x: 204,
    },
    's': {
        row: 0,
        width: 11,
        x: 216,
    },
    't': {
        row: 0,
        width: 7,
        x: 228,
    },
    'u': {
        row: 0,
        width: 11,
        x: 240,
    },
    'v': {
        row: 0,
        width: 11,
        x: 252,
    },
    'w': {
        row: 0,
        width: 11,
        x: 264,
    },
    'x': {
        row: 0,
        width: 11,
        x: 276,
    },
    'y': {
        row: 0,
        width: 11,
        x: 288,
    },
    'z': {
        row: 0,
        width: 11,
        x: 300,
    },
    ' ': {
        row: 0,
        width: 8,
        x: 312,
    },
    'A': {
        row: 1,
        width: 11,
        x: 0,
    },
    'B': {
        row: 1,
        width: 11,
        x: 12,
    },
    'C': {
        row: 1,
        width: 11,
        x: 24,
    },
    'D': {
        row: 1,
        width: 11,
        x: 36,
    },
    'E': {
        row: 1,
        width: 11,
        x: 48,
    },
    'F': {
        row: 1,
        width: 11,
        x: 60,
    },
    'G': {
        row: 1,
        width: 11,
        x: 72,
    },
    'H': {
        row: 1,
        width: 11,
        x: 84,
    },
    'I': {
        row: 1,
        width: 5,
        x: 96,
    },
    'J': {
        row: 1,
        width: 11,
        x: 108,
    },
    'K': {
        row: 1,
        width: 11,
        x: 120,
    },
    'L': {
        row: 1,
        width: 11,
        x: 132,
    },
    'M': {
        row: 1,
        width: 11,
        x: 144,
    },
    'N': {
        row: 1,
        width: 11,
        x: 156,
    },
    'O': {
        row: 1,
        width: 11,
        x: 168,
    },
    'P': {
        row: 1,
        width: 11,
        x: 180,
    },
    'Q': {
        row: 1,
        width: 11,
        x: 192,
    },
    'R': {
        row: 1,
        width: 11,
        x: 204,
    },
    'S': {
        row: 1,
        width: 11,
        x: 216,
    },
    'T': {
        row: 1,
        width: 11,
        x: 228,
    },
    'U': {
        row: 1,
        width: 11,
        x: 240,
    },
    'V': {
        row: 1,
        width: 11,
        x: 252,
    },
    'W': {
        row: 1,
        width: 11,
        x: 264,
    },
    'X': {
        row: 1,
        width: 11,
        x: 276,
    },
    'Y': {
        row: 1,
        width: 11,
        x: 288,
    },
    'Z': {
        row: 1,
        width: 11,
        x: 300,
    },
    '/': {
        row: 1,
        width: 9,
        x: 312,
    },
    '0': {
        row: 2,
        width: 11,
        x: 0,
    },
    '1': {
        row: 2,
        width: 7,
        x: 12,
    },
    '2': {
        row: 2,
        width: 11,
        x: 24,
    },
    '3': {
        row: 2,
        width: 11,
        x: 36,
    },
    '4': {
        row: 2,
        width: 11,
        x: 48,
    },
    '5': {
        row: 2,
        width: 11,
        x: 60,
    },
    '6': {
        row: 2,
        width: 11,
        x: 72,
    },
    '7': {
        row: 2,
        width: 11,
        x: 84,
    },
    '8': {
        row: 2,
        width: 11,
        x: 96,
    },
    '9': {
        row: 2,
        width: 11,
        x: 108,
    },
    '.': {
        row: 2,
        width: 5,
        x: 120,
    },
    ':': {
        row: 2,
        width: 5,
        x: 132,
    },
    ',': {
        row: 2,
        width: 4,
        x: 144,
    },
    ';': {
        row: 2,
        width: 4,
        x: 156,
    },
    '(': {
        row: 2,
        width: 5,
        x: 169,
    },
    '*': {
        row: 2,
        width: 6,
        x: 182,
    },
    '!': {
        row: 2,
        width: 5,
        x: 192,
    },
    '?': {
        row: 2,
        width: 9,
        x: 205,
    },
    '}': {
        row: 2,
        width: 6,
        x: 216,
    },
    '^': {
        row: 2,
        width: 10,
        x: 228,
    },
    ')': {
        row: 2,
        width: 5,
        x: 240,
    },
    '#': {
        row: 2,
        width: 10,
        x: 252,
    },
    '$': {
        row: 2,
        width: 10,
        x: 264,
    },
    '{': {
        row: 2,
        width: 6,
        x: 276,
    },
    '%': {
        row: 2,
        width: 10,
        x: 288,
    },
    '&': {
        row: 2,
        width: 10,
        x: 312,
    },
    '-': {
        row: 2,
        width: 10,
        x: 324,
    },
    '+': {
        row: 2,
        width: 10,
        x: 336,
    },
    '@': {
        row: 2,
        width: 10,
        x: 348,
    },
};

/**
 * Example test. Runs a few simple assertions and chains them.
 * The third one fails on purpose.
 * @test 
 */
export default class TextureManagerTest extends Test {
    constructor() {
        super('Texture Manager Test', 6); 
        this.loader = null;
    }
    
    steps() {
        this.addStep('Add and Get Texture', () => {
            return TextureManager.addTexture('Characters', './Characters.png', 64, 64, null).then((t) => {
                let tex = TextureManager.getTexture('Characters');

                this.addStep('Add Font Texture', () => {
                    return TextureManager.addTexture('DefaultFont', './mainFont.png', 1, 19, GlyphInfo).then((t) => {
                        let tex = TextureManager.getTexture('DefaultFont');
        
                        this.addStep('Get next availabe texture ID.', () => {
                            return TextureManager._setAvailableTextureID() == 3;
                        });
        
                        return tex.name == 'DefaultFont';
                    })
                })

                return tex.name == 'Characters';
            })
        });

        this.addStep('Add and Get Data Texture.', () => {
            TextureManager.addDataTexture('TextData', [0,1,2,3,4,5,6,7,8], RenderManager.GL.R16UI, RenderManager.GL.RED_INTEGER, RenderManager.GL.UNSIGNED_SHORT, -1, -1, 3, 3);
            let tex = TextureManager.getTexture('TextData');
            return tex.name == 'TextData';
        });

        this.addStep('Update Texture Data.', () => {
            TextureManager.updateDataTexture('TextData', [11, 12, 13, 14], 1, 1, 2, 2);                
            let tex = TextureManager.getTexture('TextData');
            return tex.name == 'TextData';
        });

        this.addStep('Remove Texture.', () => {
            TextureManager.removeTexture('TextData');           
            let tex = TextureManager.getTexture('TextData');
            let nextID = TextureManager._setAvailableTextureID();
            return (nextID == 1 || nextID == 2) && tex == null;
        });
    }
}