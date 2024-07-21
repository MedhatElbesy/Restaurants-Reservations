<!-- resources/views/emails/payment/success.blade.php -->

<!DOCTYPE html>
<html lang="en-Us">
<head>
    <title>Payment Success</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 80%;
            margin: auto;
            overflow: hidden;
        }
        .header, .footer {
            background: #333;
            color: #fff;
            padding: 10px 0;
            text-align: center;
        }
        .header h1, .footer h1 {
            margin: 0;
            padding: 0;
        }
        .content {
            padding: 20px;
            background: #fff;
            margin-bottom: 20px;
        }
        .content h2 {
            color: #333;
        }
        .content p {
            margin: 0 0 10px;
        }
        .table-details, .reservation-details {
            margin: 20px 0;
            padding: 10px;
            background: #f4f4f4;
        }
        .table-details h3, .reservation-details h3 {
            margin: 0;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <h1>Payment Successful</h1>
    </div>
    <div class="content">
        <h2>Dear Customer,</h2>
        <p>We have received your payment, Your reservation has been confirmed.</p>
        <p>Thank you for your reservation!</p>
        <div class="reservation-details">
            <h3>Reservation Details:</h3>
            <p><strong>Total Price:</strong> ${{ $reservation->total_price }}</p>
            <p><strong>Notes:</strong> {{ $reservation->notes }}</p>
            <p><strong>Status:</strong> {{ $reservation->status }}</p>
        </div>
        @foreach($reservation_details as $reservation_detail)
            <div class="table-details">
                <h3>Table Details:</h3>
                <p><strong>Table No.:</strong> {{ $reservation_detail->table->id }}</p>
                <p><strong>Number of Seats On Table:</strong> {{ $reservation_detail->table->max_number_of_persons }}</p>
                <p><strong>Extra Chairs:</strong> {{ $reservation_detail->number_of_extra_chairs }}</p>
                <p><strong>Extra Child Chairs:</strong> {{ $reservation_detail->number_of_extra_childs_chairs }}</p>
                <p><strong>Price:</strong> ${{ $reservation_detail->table->price }}</p>
                <p><strong>Sale Price:</strong> ${{ $reservation_detail->sale_price }}</p>
            </div>
        @endforeach
    </div>
    <div class="footer">
        <p>Thank you for choosing our restaurant!</p>
    </div>
</div>
</body>
</html>
