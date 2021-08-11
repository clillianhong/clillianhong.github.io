import WordSwarm from './WordSwarm'
var zip = require('lodash/zip');

const MultiWordSwarm = ({ mouse, words, counts, colors }) => {

    const together = zip(words, counts, colors)

    return (
        <>
            {together.map((w) => <WordSwarm key={w[0]} count={w[1]} mouse={mouse} word={w[0]} color={w[2]} />)}
        </ >
    );

}

export default MultiWordSwarm;