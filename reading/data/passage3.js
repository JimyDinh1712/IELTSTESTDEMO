const passage3Data = {
        title: "Robots and us",
    subtitle: "Three leaders in their fields answer questions about our relationships with robots",
    content: `
        <p><strong>Three leaders in their fields answer questions about our relationships with robots</strong></p>
        
        <p>When asked ‘Should robots be used to colonise other planets?’, cosmology and astrophysics Professor Martin Rees said he believed the solar system would be mapped by robotic craft by the end of the century. ‘The next step would be mining of asteroids, enabling fabrication of large structures in space without having to bring all the raw materials from Earth…. I think this is more realistic and benign than the … “terraforming”* of planets.’ He maintains that colonised planets ‘should be preserved with a status that is analogous to Antarctica here on Earth.’</p>
        
        <p>On the question of using robots to colonise other planets and exploit mineral resources, engineering Professor Daniel Wolpert replied, ‘I don’t see a pressing need to colonise other planets unless we can bring [these] resources back to Earth. The vast majority of Earth is currently inaccessible to us. Using robots to gather resources nearer to home would seem to be a better use of our robotic tools.’</p>
        
        <p>Meanwhile, for anthropology Professor Kathleen Richardson, the idea of ‘colonisation’ of other planets seemed morally dubious: ‘I think whether we do something on Earth or on Mars we should always do it in the spirit of a genuine interest in “the Other”, not to impose a particular model, but to meet “the Other”.’</p>
        
        <p>In response to the second question, ‘How soon will machine intelligence outstrip human intelligence?’, Rees mentions robots that are advanced enough to beat humans at chess, but then goes on to say, ‘Robots are still limited in their ability to sense their environment: they can’t yet recognise and move the pieces on a real chessboard as cleverly as a child can. Later this century, however, their more advanced successors may relate to their surroundings, and to people, as adeptly as we do. Moral questions then arise. … Should we feel guilty about exploiting [sophisticated robots]? Should we fret if they are underemployed, frustrated, or bored?’</p>
        
        <p>Wolpert’s response to the question about machine intelligence outstripping human intelligence was this: ‘In a limited sense it already has. Machines can already navigate, remember and search for items with an ability that far outstrips humans. However, there is no machine that can identify visual objects or speech with the reliability and flexibility of humans…. Expecting a machine close to the creative intelligence of a human within the next 50 years would be highly ambitious.’</p>
        
        <p>Richardson believes that our fear of machines becoming too advanced has more to do with human nature than anything intrinsic to the machines themselves. In her view, it stems from humans’ tendency to personify inanimate objects: we create machines based on representations of ourselves, imagine that machines think and behave as we do, and therefore see them as an autonomous threat. ‘One of the consequences of thinking that the problem lies with machines is that we tend to imagine they are greater and more powerful than they really are and subsequently they become so.’</p>
        
        <p>This led on to the third question, ‘Should we be scared by advances in artificial intelligence?’ To this question, Rees replied, ‘Those who should be worried are the futurologists who believe in the so-called “singularity”.** … And another worry is that we are increasingly dependent on computer networks, and that these could behave like a single “brain” with a mind of its own, and with goals that may be contrary to human welfare. I think we should ensure that robots remain as no more than “idiot savants” lacking the capacity to outwit us, even though they may greatly surpass us in the ability to calculate and process information.’</p>
        
        <p>Wolpert’s response was to say that we have already seen the damaging effects of artificial intelligence in the form of computer viruses. ‘But in this case,’ he says, ‘the real intelligence is the malicious designer. Critically, the benefits of computers outweigh the damage that computer viruses cause. Similarly, while there may be misuses of robotics in the near future, the benefits that they will bring are likely to outweigh these negative aspects.’</p>
        
        <p>Richardson’s response to this question was this: ‘We need to ask why fears of artificial intelligence and robots persist; none have in fact risen up and challenged human supremacy.’ She believes that as robots have never shown themselves to be a threat to humans, it seems unlikely that they ever will. In fact, she went on, ‘Not all fear [robots]; many people welcome machine intelligence.’</p>
        
        <p>In answer to the fourth question, What can science fiction tell us about robotics?’, Rees replied, ‘I sometimes advise students that it’s better to read first-rate science fiction than second-rate science more stimulating, and perhaps no more likely to be wrong.’</p>
        
        <p>As his response, Wolpert commented, ‘Science fiction has often been remarkable at predicting the future. Science fiction has painted a vivid spectrum of possible futures, from cute and helpful robots to dystopian robotic societies. Interestingly, almost no science fiction envisages a future without robots.’</p>
        
        <p>Finally, on the question of science fiction, Richardson pointed out that in modern society, people tend to think there is reality on the one hand, and fiction and fantasy on the other. She then explained that the division did not always exist, and that scientists and technologists made this separation because they wanted to carve out the sphere of their work. ‘But the divide is not so clear cut, and that is why the worlds seem to collide at times,’ she said. ‘In some cases, we need to bring these different understandings together to get a whole perspective. Perhaps then, we won’t be so frightened that something we create as a copy of ourselves will be a [threat] to us.’</p>
        
        <hr>
        <p><small>*terraforming: modifying a planet’s atmosphere to suit human needs</small></p>
        <p><small>** singularity: the point when robots will be able to start creating ever more sophisticated versions of themselves</small></p>
    `,
    questions: [
        {
            id: "header-27-33",
            type: "instruction",
            text: `
                <div class="instruction-box">
                    <h2 style="font-size: 1.3rem; margin-bottom: 10px;">Questions 27-33</h2>
                    <p>Look at the following statements (Questions 27-33) and the list of people below.</p>
                    <p>Match each statement with the correct person, <strong>A, B</strong> or <strong>C</strong>.</p>
                    <p>Write the correct letter, <strong>A, B</strong> or <strong>C</strong>, in boxes 27-33 on your answer sheet.</p>
                    <p><strong>NB</strong> You may use any letter more than once.</p>

                    <div class="list-names" style="border: 1px solid #000; padding: 15px; margin: 20px 0; background: #f9f9f9; width: fit-content; min-width: 300px;">
                        <h3 style="margin-top: 0; text-decoration: underline;">List of People</h3>
                        <ul style="list-style: none; padding-left: 0; margin-bottom: 0;">
                            <li><strong>A</strong> Martin Rees</li>
                            <li><strong>B</strong> Daniel Wolpert</li>
                            <li><strong>C</strong> Kathleen Richardson</li>
                        </ul>
                    </div>
                </div>
            `
        },
        // Các câu hỏi Matching Name
        { id: 27, type: "multiple-choice", text: "It is better to use robots to find resources on Earth than on other planets.", options: ["A", "B", "C"] },
        { id: 28, type: "multiple-choice", text: "There is a moral issue involved in using the word ‘colonisation’.", options: ["A", "B", "C"] },
        { id: 29, type: "multiple-choice", text: "We should treat other planets in the same way as we treat the Antarctic.", options: ["A", "B", "C"] },
        { id: 30, type: "multiple-choice", text: "The term ‘robot’ is often used in a way that is not strictly accurate.", options: ["A", "B", "C"] },
        { id: 31, type: "multiple-choice", text: "The use of robots on other planets is a more practical idea than terraforming them.", options: ["A", "B", "C"] },
        { id: 32, type: "multiple-choice", text: "People’s expectations of what robots can do are often based on fiction.", options: ["A", "B", "C"] },
        { id: 33, type: "multiple-choice", text: "It is important to remember that robots do not have any feelings.", options: ["A", "B", "C"] },

       {
        id: "header-34-36",
        type: "instruction",
        text: `
            <div class="instruction-box" style="margin-top: 25px;">
                <h2 style="font-size: 1.3rem; margin-bottom: 10px;">Questions 34-36</h2>
                <p>Complete each sentence with the correct ending, <strong>A-E</strong>, below.</p>
                <p>Write the correct letter, <strong>A-E</strong>, in boxes 34-36 on your answer sheet.</p>

                <div class="list-endings" style="border: 1px solid #000; padding: 15px; margin: 20px 0; background: #fff;">
                    <h3 style="margin-top: 0; text-decoration: underline;">List of Endings</h3>
                    <ul style="list-style: none; padding-left: 0; line-height: 1.8;">
                        <li><strong>A</strong> is more achievable than trying to make planets habitable for humans.</li>
                        <li><strong>B</strong> should be avoided because of the potential for ethical problems.</li>
                        <li><strong>C</strong> would be more beneficial if carried out on Earth.</li>
                        <li><strong>D</strong> might lead to robots having too much influence over our lives.</li>
                        <li><strong>E</strong> should be protected in the same way as some areas of our own planet.</li>
                    </ul>
                </div>
            </div>
        `
    },
    { 
        id: 34, 
        type: "multiple-choice", 
        text: "Martin Rees believes that the mining of asteroids", 
        options: ["A", "B", "C", "D", "E"] 
    },
    { 
        id: 35, 
        type: "multiple-choice", 
        text: "Daniel Wolpert suggests that the use of robots to get resources", 
        options: ["A", "B", "C", "D", "E"] 
    },
    { 
        id: 36, 
        type: "multiple-choice", 
        text: "Kathleen Richardson feels that the colonisation of other planets", 
        options: ["A", "B", "C", "D", "E"] 
    },
        // Questions 37–40: Multiple Choice
{
        id: "header-37-40",
        type: "instruction",
        text: `<div class="instruction-box" style="margin-top:30px;"><h2>Questions 37-40</h2><p>Choose the correct letter, <strong>A, B, C</strong> or <strong>D</strong>.</p></div>`
    },
        { 
            id: 37, 
            type: "multiple-choice", 
            text: "What point does Richardson make about fear of machines?", 
            options: [
                "A It has grown alongside the development of ever more advanced robots.", 
                "B It is the result of our inclination to attribute human characteristics to non-human entities.", 
                "C It has its origins in basic misunderstandings about how inanimate objects function.", 
                "D It demonstrates a key difference between human intelligence and machine intelligence."
            ] 
        },
        { 
            id: 38, 
            type: "multiple-choice", 
            text: "What potential advance does Rees see as a cause for concern?", 
            options: [
                "A robots outnumbering people", 
                "B robots having abilities which humans do not", 
                "C artificial intelligence developing independent thought", 
                "D artificial intelligence taking over every aspect of our lives"
            ] 
        },
        { 
            id: 39, 
            type: "multiple-choice", 
            text: "What does Wolpert emphasise in his response to the question about science fiction?", 
            options: [
                "A how science fiction influences our attitudes to robots", 
                "B how fundamental robots are to the science fiction genre", 
                "C how the image of robots in science fiction has changed over time", 
                "D how reactions to similar portrayals of robots in science fiction may vary"
            ] 
        },
        { 
            id: 40, 
            type: "multiple-choice", 
            text: "What is Richardson doing in her comment about reality and fantasy?", 
            options: [
                "A warning people not to confuse one with the other", 
                "B outlining ways in which one has impacted on the other", 
                "C recommending a change of approach in how people view them", 
                "D explaining why scientists have a different perspective on them from other people"
            ] 
        }
    ]

};
