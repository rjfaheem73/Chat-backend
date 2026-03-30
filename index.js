
                ]
            })
        });

        const data = await response.json();

        console.log(data); // 
});

app.get("/", (req, res) => {
    res.send("Server running");
});

app.listen(3000, () => console.log("Server running"));
