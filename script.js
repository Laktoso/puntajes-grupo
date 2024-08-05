document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('scoresChart').getContext('2d');
    const groups = {};

    let chart;

    document.getElementById('addParticipant').addEventListener('click', function () {
        const groupName = document.getElementById('groupName').value.trim();
        const participantName = document.getElementById('participantName').value.trim();
        const participantScore = parseInt(document.getElementById('participantScore').value);

        if (groupName && participantName && !isNaN(participantScore)) {
            if (!groups[groupName]) {
                groups[groupName] = [];
            }
            groups[groupName].push({ name: participantName, score: participantScore });

            document.getElementById('groupName').value = '';
            document.getElementById('participantName').value = '';
            document.getElementById('participantScore').value = '';

            updateChart();
        } else {
            alert("Por favor, ingrese un nombre de grupo, nombre de participante y un puntaje válido.");
        }
    });

    document.getElementById('generateChart').addEventListener('click', updateChart);

    function updateChart() {
        const groupNames = Object.keys(groups);
        const groupScores = groupNames.map(groupName => {
            return groups[groupName].reduce((total, participant) => total + participant.score, 0);
        });

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: groupNames,
                datasets: [{
                    label: 'Puntaje Acumulado',
                    data: groupScores,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                animation: {
                    duration: 1000
                }
            }
        });

        // Determinar el grupo ganador
        const maxScore = Math.max(...groupScores);
        const winnerIndex = groupScores.indexOf(maxScore);
        const winnerName = groupNames[winnerIndex];
        document.getElementById('winner').textContent = `Ganador: ${winnerName}`;
    }
});
