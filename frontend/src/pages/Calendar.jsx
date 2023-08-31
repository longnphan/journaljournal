import { Card, CardBody, Typography, Button } from "@material-tailwind/react";

function Calendar() {
  return (
    <>
      <Card className="mt-6 w-1/2 mx-auto">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Calendar
          </Typography>
        </CardBody>
      </Card>
    </>
  );
}

export default Calendar;
