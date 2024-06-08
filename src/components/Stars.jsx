const Stars = ({rating, setRating}) => {
    const handleClick = (newRating) => {
        setRating(newRating)
    }

    return (
        <>
        <br />
        {
            [1,2,3,4,5].map((oneStar, i) => {
                return (
                   
                    <span key={i}
                    onClick={()=> handleClick(oneStar)}
                    style={{
                        cursor: 'pointer', 
                        color: oneStar <= rating ? '#E11D48' : 'grey',
                        fontSize: '32px' 
                    }}
                    >
                    ★ 
                    </span>
                )
            })
        }
        </>
    );
};

export default Stars;
