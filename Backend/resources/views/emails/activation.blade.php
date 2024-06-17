@extends('emails.layout')
@section('title', 'Confirm Your Email')
@section('content')
    <td style="padding:0 35px;">
        <h1 style="margin-bottom: 35px; color:#037235;">{{ config('app.name') }}</h1>
        <h3 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
            Thank you for registering a new account on our site. You need to confirm your email address. </h3>
        <span
            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
            Please confirm your email by entering the four-digit code:
            <span style="color:#037235;font-size:15px ;font-weight:700;text-decoration:underline;"
                  class="fs-2 fw-5 text-success">{{ $token }}</span>
        </p>
    </td>
@endsection
