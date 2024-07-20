@extends('emails.layout')
@section('title', 'Successful Payment')
@section('content')
<p>Dear {{ $userName }},</p>
<p>We have received your payment of ${{ $paymentAmount }} on {{ $paymentDate }}.</p>
<p>Thank you for your purchase!</p>
@endsection
