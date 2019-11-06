import * as path from 'path';

import { getHintPath, HintLocalTest, testLocalHint } from '@hint/utils-tests-helpers';

const hintPath = getHintPath(__filename, true);

const tests: HintLocalTest[] = [
    {
        name: 'Configuration with "compilerOptions.forceConsistentCasingInFileNames = true" should pass',
        path: path.join(__dirname, 'fixtures', 'consistent-casing', 'valid')
    },
    {
        name: 'Configuration with "compilerOptions.forceConsistentCasingInFileNames = false" should fail',
        path: path.join(__dirname, 'fixtures', 'consistent-casing', 'consistent-casing-false'),
        reports: [
            {
                message: 'The compiler option "forceConsistentCasingInFileNames" should be enabled to reduce issues when working with different OSes.',
                position: { match: 'false' }
            }]
    },
    {
        name: 'Configuration without "compilerOptions.forceConsistentCasingInFileNames" should fail',
        path: path.join(__dirname, 'fixtures', 'consistent-casing', 'no-consistent-casing'),
        reports: [{
            message: 'The compiler option "forceConsistentCasingInFileNames" should be enabled to reduce issues when working with different OSes.',
            position: { match: 'compilerOptions' }
        }]
    }
];

testLocalHint(hintPath, tests, { parsers: ['typescript-config'] });
