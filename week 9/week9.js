document.getElementById('windowObject').addEventListener('click', event => {
    alert('alert Hello There Beautiful');
    window.alert('Window alert Hello There Beautiful');
    confirm('Here is a confirmation for Beautiful');
    window.confirm('Here is a confirmation for Beautiful from the window!');
})

document.getElementById('windowWindow').addEventListener('click', event => {
    const popup = window.open('https://sgraf03226.github.io/WDD-330/','Stephanie WDD 330 Portfolio','width=400,height=400,resizable=yes');
})