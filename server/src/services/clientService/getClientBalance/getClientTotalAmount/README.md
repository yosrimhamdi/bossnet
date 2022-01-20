# Example of total amount calculation

## Step 1: ( Fetch left and right children counts grouped by treeHeight )
## Step 2: ( Fix left right counts to be balanced from top to bottom )

- 1  | 1     / 1      => 1            / 1
- 2  | 2     / 2      => 2            / 2
- 3  | 3     / 4      => 3 + 1 = 4    / 4
- 4  | 6     / 5      => 6 - 1 = 5    / 5
- 5  | 9     / 10     => 9 + 1 = 10   / 10 
- 6  | 8     / 7      => 8 - 1 = 7    / 7
- 7  | 16    / 14     => 16           / 14 + 2 = 16
- 8  | 32    / 28     => 32           / 28 - 2 + 6 = 32 
- 9  | 64    / 50     => 64           / 50 - 6 + 20 = 64
- 10 | 128  / 100    => 128          / 100 - 20 + 48 = 128
- 11 | 200  / 200    => 200          / 200 - 48 + 48 = 200
- 12 | 400  / 400    => 400          / 400 - 48 + 48 = 400
- 13 | 750  / 700    => 750          / 700 - 48 + 14 = 666 (Maximum to add is 666)
- 14 | 1000 / 1400   => 1000         / 1400 - 14 = 1386
- 15 | 1500 / 200    => 1500         / 200 + 466 = 666
- 16 | 8    / 17     => 8            / 17 - 466 + 457 = 8
- 17 | 4    / 6      => 4            / 6 - 457 + 455 = 4
- Reste |            => 0            / 455


## Step 3: ( Remove the reste after fixing from bottom to top )
- Reste |              => 0            / 455
- 17    | 4    / 4      => 4            / 0, Reste => 455 - 4 = 451
- 16    | 8    / 8      => 8            / 0, Reste => 451 - 8 = 443 
- 15    | 1500 / 666    =>              / 223 , Reste => 666 - 443 = 223 Done! 


## Step 4: ( Calc total amount from fixed list by SUM(MIN(MIN(left, right), 666) ) * 2 * 7.5 )
Total = ( 1 + 2 + 4 + 5 + 10 + 7 + 16 + 32 + 64 + 128 + 200 + 400 + 666 + 666 + 223 + 0 + 0) * 2 * 7.5 = 36360 TND