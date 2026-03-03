const requireHack = require('module').createRequire(process.cwd() + '/');
const { renderToStaticMarkup } = require('react-dom/server');
const React = require('react');

const aiReact = require('@ai-sdk/react');

function TestComp() {
    try {
        const chat = aiReact.useChat();
        console.log("USECHAT KEYS:", Object.keys(chat));
    } catch (e) {
        console.log("ERROR in useChat:", e.message);
    }
    return React.createElement('div', null, 'Test');
}

renderToStaticMarkup(React.createElement(TestComp));
