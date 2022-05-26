<?php

namespace App\Lib;

trait ApiFeedbackSender {
  private function sendError($data) {
    return json_encode([
        'error' => true,
        'data' => $data
    ]);
  } 

  private function sendSuccess($data) {
    return json_encode([
        'error' => false,
        'data' => $data
    ]);
  } 
}