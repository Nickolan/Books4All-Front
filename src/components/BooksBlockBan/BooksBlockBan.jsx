import { Badge, Box, Tooltip, badgeClasses, styled } from "@mui/material";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { green, purple, red } from "@mui/material/colors";

const blue = {
    500: '#000000',
};

const grey = {
    300: '#f5f5f5',
    900: '#24292f',
};

const StyledBadge = styled(Badge)(
    ({ theme }) => `
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 24px;
    font-variant: tabular-nums;
    list-style: none;
    font-family: IBM Plex Sans, sans-serif;
    position: relative;
    display: inline-block;
    line-height: 1;
  
    & .${badgeClasses.badge} {
      z-index: auto;
      position: absolute;
      top: 0;
      right: 0;
      min-width: 22px;
      height: 22px;
      padding: 0 6px;
      color: #fff;
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
      white-space: nowrap;
      text-align: center;
      border-radius: 12px;
      background: ${blue[500]};
      box-shadow: 0px 4px 8px ${theme.palette.mode === 'dark' ? grey[900] : grey[300]};
      transform: translate(50%, -50%);
      transform-origin: 100% 0;
    }
    `,
);

export default function BooksBlockBan({ banBooks }) {

    return (
        <div>
            <Tooltip title={`Inactive books (${banBooks.length})`}>
                <StyledBadge badgeContent={banBooks.length}>
                    <LibraryBooksIcon sx={{
                        color: red[700], fontSize: 200,
                        borderRadius: '12px',
                        background: (theme) =>
                            theme.palette.mode === 'dark' ? grey[400] : grey[300],
                        display: 'inline-block',
                        verticalAlign: 'middle',
                        border: 1
                    }} />
                </StyledBadge>
            </Tooltip>
        </div>
    )
}