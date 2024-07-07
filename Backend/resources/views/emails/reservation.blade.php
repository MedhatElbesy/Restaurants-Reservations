@extends('emails.layout')
@section('title', 'Confirm Your Email')
@section('content')
    <td style="padding:0 35px;">
        <h1 style="margin-bottom: 35px; color:#037235;">{{ config('app.name') }}</h1>
        <h3 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
            Your Reservation {{ $status }}</h3>
        <span
            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
    </td>
@endsection
